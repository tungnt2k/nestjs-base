/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/prefer-default-export */
import {
  // @ts-ignore
  getAccount,
  // @ts-ignore
  TokenAccountNotFoundError,
  // @ts-ignore
  TokenInvalidAccountOwnerError,
} from '@solana/spl-token';
import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SignatureStatus,
  SimulatedTransactionResponse,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';
import BN from 'bignumber.js';
import { isNaN, isNumber, isObject, isString } from 'lodash';

import { Logger, LoggerInterface } from './logger';
import { SolConnection } from './solConnection';
import { SolGet } from './solGet';
import { delay, getUnixTs, rx } from './utils';

export class SolTransaction {
  private logger: LoggerInterface;

  private connection: Connection;

  private static instance?: SolTransaction = undefined;

  constructor(_connection = SolConnection.getInstance().getConnection()) {
    this.logger = new Logger(__filename);
    this.connection = _connection;
  }

  public static getInstance(): SolTransaction {
    if (this.instance === undefined) {
      this.instance = new SolTransaction();
    }

    return this.instance;
  }

  async checkEnoughSolToPayFee(publicKey: string, tx: Transaction): Promise<boolean> {
    if (!tx) return false;

    const [solBal, fee] = await Promise.all([
      this.connection.getBalance(new PublicKey(publicKey)),
      tx.getEstimatedFee(this.connection),
    ]);

    this.logger.info(`Payer SOL balance is ${new BN(solBal).dividedBy(new BN(LAMPORTS_PER_SOL)).toNumber()}`);
    this.logger.info(`Fee is ${new BN(fee).dividedBy(new BN(LAMPORTS_PER_SOL)).toNumber()}`);

    if (isNaN(new BN(fee).dividedBy(new BN(LAMPORTS_PER_SOL)).toNumber())) throw new Error('Please try again');

    if (new BN(solBal).lte(new BN(fee))) throw new Error('Not enough balance');

    return true;
  }

  async createRaw(transactions: Transaction, signers: Keypair[], fees: number) {
    const { blockhash } = await this.connection.getLatestBlockhash('finalized');
    transactions.recentBlockhash = blockhash;

    transactions.sign(...signers);
    try {
      const raw = transactions.serialize();
      const size = Buffer.byteLength(raw);
      if (size > 1232) return null;
      return {
        raw,
        fees,
        size,
      };
    } catch (e) {
      return null;
    }
  }

  async feeCal(payerAddr: string, _addrs: string[][], _receives: string[][], _mints?: string[][]) {
    let fees = 0;
    const cc = new Map();
    for (let i = 0; i < _receives.length; i += 1) {
      if (_mints !== undefined) {
        for (let j = 0; j < _receives[i].length; j += 1) {
          if (!cc.has(_receives[i][j])) {
            const ata = await SolGet.getInstance().getAssociatedTokenAddress(
              new PublicKey(_mints[i][j]),
              new PublicKey(_receives[i][j]),
            );
            try {
              await getAccount(this.connection, ata);
              cc.set(_receives[i][j], true);
            } catch (error) {
              if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
                fees = new BN(fees).plus(0.00203928).toNumber();
                cc.set(_receives[i][j], true);
              } else {
                throw error;
              }
            }
          }
        }
      }
      const signers = [payerAddr].concat(_addrs[i]);

      fees = new BN(fees).plus(new BN(new Set(signers).size).multipliedBy(0.000005)).toNumber();
    }
    return rx(fees, 8);
  }

  async sendTransactionWithRetryWithKeypair(
    connection: Connection,
    tx: Transaction,
    timeout = 30000,
    commitment: Commitment = 'confirmed',
  ) {
    let slot = 0;
    let txId: TransactionSignature;
    let isTimeout = false;
    try {
      const baseMessage = 'Please wait and try again in a few seconds';
      const startTime = getUnixTs();
      const rawTx = tx.serialize();

      try {
        txId = await connection.sendRawTransaction(rawTx);
      } catch (error: any) {
        const errMsg: string = error?.message;

        if (errMsg.slice(-6) === '0x1780') {
          throw new Error('This item is sold out');
        } else if (errMsg.slice(-6) === '0x1795') {
          throw new Error('This item does not exists');
        } else if (errMsg.slice(-3) === '0x4') {
          throw new Error('Owner does not match');
        } else if (
          errMsg.includes('Attempt to debit an account but found no record of a prior credit.') ||
          errMsg.slice(-3) === '0x1' ||
          errMsg.includes(
            'failed to send transaction: Transaction simulation failed: Transaction leaves an account with a lower balance than rent-exempt minimum',
          ) ||
          errMsg.includes('InvalidRentPayingAccount')
        ) {
          throw new Error('Not enough balance');
        } else {
          this.logger.error(error);
          throw new Error(baseMessage);
        }
      }

      this.logger.info('Started awaiting confirmation for', txId);

      let done = false;

      (async () => {
        while (!done && getUnixTs() - startTime < timeout) {
          await connection.sendRawTransaction(rawTx, {
            skipPreflight: true,
          });
          await delay(500);
        }
      })();

      try {
        const confirmation = await this.awaitTransactionSignatureConfirmation(
          txId,
          timeout,
          connection,
          commitment,
          true,
        );

        if (!confirmation) throw new Error('Timed out awaiting confirmation on transaction');

        if (confirmation.err) {
          this.logger.info(confirmation.err);
          throw new Error('Transaction failed: Custom instruction error');
        }

        slot = confirmation?.slot || 0;
      } catch (err: any) {
        this.logger.info('Timeout Error caught', err);
        if (err.timeout) {
          isTimeout = true;
          throw new Error('Timed out awaiting confirmation on transaction');
        }
        let simulateResult: SimulatedTransactionResponse | null = null;
        try {
          simulateResult = (await connection.simulateTransaction(tx)).value;
        } catch (e) {
          this.logger.info('Simulate Transaction error', e);
        }

        /// --------------------Handler error message-----------------------------
        let msgStr = baseMessage;
        let msgFromLog = null;
        if (simulateResult?.logs) {
          for (let i = simulateResult.logs.length - 1; i >= 0; i -= 1) {
            const line = simulateResult.logs[i];
            if (line.startsWith('Program log: ')) {
              msgFromLog = line.slice('Program log: '.length);
              break;
            }
          }
        }

        if (simulateResult && simulateResult.err) {
          if (isString(simulateResult.err)) {
            switch (simulateResult.err) {
              case 'InvalidRentPayingAccount':
                msgStr = 'Not enough balance';
                break;

              default:
                break;
            }
          } else if (isObject(simulateResult.err)) {
            // @ts-ignore
            switch (simulateResult.err?.InstructionError?.[1]?.Custom) {
              case 6037:
                if (
                  msgFromLog ===
                  'AnchorError occurred. Error Code: BuyerTradeStateNotValid. Error Number: 6037. Error Message: The buyer trade state was unable to be initialized..'
                ) {
                  msgStr = 'This item does not exists.';
                }
                break;

              case 1:
                if (
                  msgFromLog === 'Error: insufficient funds' ||
                  msgFromLog === 'Create' ||
                  (msgFromLog?.includes('Transfer') && msgFromLog?.includes('lamports to the new account'))
                ) {
                  msgStr = 'Not enough balance';
                }
                break;

              case 4:
                if (msgFromLog === 'Error: owner does not match') {
                  msgStr = 'Owner does not match';
                }
                break;

              case 6016:
                if (
                  msgFromLog ===
                  'AnchorError occurred. Error Code: BothPartiesNeedToAgreeToSale. Error Number: 6016. Error Message: Both parties need to agree to this sale.'
                ) {
                  msgStr = 'This item is sold out';
                }
                break;

              default:
                msgStr = msgFromLog || baseMessage;
                break;
            }
          }

          throw new Error(msgStr);
        }
        this.logger.info('Got this far.');
      } finally {
        done = true;
      }

      this.logger.info('Latency (ms)', txId, getUnixTs() - startTime);
      return { txId, slot, success: true, error: null, isTimeout };
    } catch (error: any) {
      return {
        // @ts-ignore
        txId: txId || '',
        slot,
        success: false,
        error: error?.message || error,
        isTimeout,
      };
    }
  }

  async awaitTransactionSignatureConfirmation(
    txId: TransactionSignature,
    timeout: number,
    connection: Connection,
    commitment: Commitment = 'recent',
    queryStatus = false,
  ): Promise<SignatureStatus | null | void> {
    let done = false;
    let status: SignatureStatus | null | void = {
      slot: 0,
      confirmations: 0,
      err: null,
    };
    let subId = 0;
    // eslint-disable-next-line no-async-promise-executor
    status = await new Promise(async (resolve, reject) => {
      setTimeout(() => {
        if (done) {
          return;
        }
        done = true;
        this.logger.info('Rejecting for timeout...');
        reject({ timeout: true });
      }, timeout);

      try {
        subId = connection.onSignature(
          txId,
          (result, context) => {
            status = {
              err: result.err,
              slot: context.slot,
              confirmations: 0,
            };
            if (result.err) {
              this.logger.info('Rejected via websocket', result.err);
              done = true;
              reject(result.err);
            } else {
              this.logger.info('Resolved via websocket', result);
            }
          },
          commitment,
        );
      } catch (e) {
        this.logger.info('WS error in setup', txId, e);
      }
      while (!done && queryStatus) {
        // eslint-disable-next-line no-loop-func
        (async () => {
          try {
            const signatureStatuses = await connection.getSignatureStatus(txId);
            this.logger.info('Signature status', signatureStatuses);
            status = signatureStatuses?.value;
            if (!done) {
              if (!status) {
                this.logger.info('REST null result for', txId, status);
              } else if (status.err) {
                this.logger.info('REST error for', txId, status);
                done = true;
                reject(status.err);
              } else {
                if (!status.confirmations) {
                  this.logger.info('REST no confirmations for', txId, status);
                }

                if (isNumber(status?.confirmations) && status?.confirmations > 10) {
                  this.logger.info('REST confirmation for', txId, status);
                  done = true;
                  resolve(status);
                }

                if (status?.confirmationStatus === 'finalized') {
                  this.logger.info('REST confirmation for', txId, status);
                  done = true;
                  resolve(status);
                }
              }
            }
          } catch (e) {
            if (!done) {
              this.logger.info('REST connection error: txId', txId, e);
            }
          }
        })();
        await delay(2000);
      }
    });

    try {
      if (subId) {
        await connection.removeSignatureListener(subId);
      }
    } catch (error) {
      this.logger.info(error);
    }
    done = true;
    this.logger.info('Returning status', status);
    return status;
  }
}
