/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/prefer-default-export */
import {
  // @ts-ignore
  createTransferInstruction,
} from '@solana/spl-token';
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmRawTransaction,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import BN from 'bignumber.js';

import { Logger, LoggerInterface } from './logger';
import { SolConnection } from './solConnection';
import { SolGet } from './solGet';
import { SolTransaction } from './solTransaction';
import { chunkSolTransferArray, chunkSplTransferArray, delay, isAddrs, rx } from './utils';

export class SolTransfer {
  // @ts-ignore
  private logger: LoggerInterface;

  // @ts-ignore
  private connection: Connection;

  private static instance?: SolTransfer = undefined;

  constructor(_connection = SolConnection.getInstance().getConnection()) {
    this.logger = new Logger(__filename);
    this.connection = _connection;
  }

  public static getInstance(): SolTransfer {
    if (this.instance === undefined) {
      this.instance = new SolTransfer();
    }

    return this.instance;
  }

  async sendSol(
    wallet: Keypair,
    receiver: string,
    value?: number,
    opts?: {
      payer?: Keypair;
      check?: boolean;
      ts?: number;
      checkFees?: boolean;
      chunk?: number;
    },
  ) {
    const rs = await this.solSend([wallet], [receiver], {
      ...opts,
      values: value ? [value] : undefined,
    });
    return {
      success: Boolean(rs),
      txId: rs ? rs[0] : null,
    };
  }

  async sendSplToken(
    wallet: Keypair,
    receiver: string,
    mint: string,
    value?: number,
    opts?: {
      payer?: Keypair;
      check?: boolean;
      ts?: number;
      checkFees?: boolean;
      chunk?: number;
    },
  ) {
    const rs = await this.splSend([wallet], [receiver], [mint], {
      ...opts,
      values: value ? [value] : undefined,
    });
    return {
      success: Boolean(rs),
      txId: rs ? rs[0] : null,
    };
  }

  async sendSolMultiple(
    wallets: Keypair[],
    receivers: string[],
    values: number[],
    opts: {
      payer?: Keypair;
      check?: boolean;
      ts?: number;
      checkFees?: boolean;
      chunk?: number;
    },
  ) {
    const rs = await this.solSend(wallets, receivers, {
      ...opts,
      values,
    });
    return {
      success: Boolean(rs),
      txId: rs || null,
    };
  }

  async splSendMultiple(
    wallets: Keypair[],
    receivers: string[],
    mints: string[],
    values: number[],
    opts: {
      payer?: Keypair;
      check?: boolean;
      ts?: number;
      checkFees?: boolean;
      chunk?: number;
    },
  ) {
    const rs = await this.splSend(wallets, receivers, mints, {
      ...opts,
      values,
    });
    return {
      success: Boolean(rs),
      txId: rs || null,
    };
  }

  private async solSend(
    wallets: Keypair[],
    receives: string[],
    opts: {
      values?: number[];
      payer?: Keypair;
      check?: boolean;
      ts?: number;
      checkFees?: boolean;
      chunk?: number;
    },
  ) {
    const conn = SolConnection.getInstance().getConnection();

    if (!isAddrs(receives)) return null;

    let { values, check = false } = opts;
    const { payer = wallets[0], chunk = 10, ts = 5000 } = opts;

    const payerAddr = payer.publicKey.toBase58();

    if (!values) {
      const _addrx = wallets.map((wallet) => wallet.publicKey.toBase58());
      if (_addrx.includes(payerAddr)) return null;
      const bals = await SolGet.getInstance().solBalances(_addrx);
      values = bals.map((bal) => bal.ui);
      check = false;
    }

    const fp = chunkSolTransferArray(wallets, receives, values, chunk);
    if (!fp) return null;

    const { _wallets, _receives, _values, _addrs, addrx, valuex } = fp;

    if (check) {
      const xFees = await SolTransaction.getInstance().feeCal(payerAddr, _addrs, _receives);
      const avails = [xFees].concat(valuex);
      const bals = await SolGet.getInstance().solBalances([payerAddr].concat(addrx), avails);
      if (!bals) return null;
    }

    const txs: string[] = [];
    for (let i = 0; i < _wallets.length; i += 1) {
      const sr = await this.createSolRaw(payer, _wallets[i], _receives[i], _values[i], _addrs[i]);
      if (!sr) return null;
      const tx = await sendAndConfirmRawTransaction(conn, sr.raw);
      txs.push(tx);
      this.logger.info(i, tx);

      await delay(ts * i);
    }
    return txs;
  }

  private async splSend(
    wallets: Keypair[],
    receives: string[],
    mints: string[],
    opts: {
      values?: number[];
      payer?: Keypair;
      check?: boolean;
      ts?: number;
      checkFees?: boolean;
      chunk?: number;
      decimal?: number;
    },
  ) {
    const conn = SolConnection.getInstance().getConnection();

    if (!isAddrs(receives)) return null;

    let { values, check = false } = opts;

    const { payer = wallets[0], chunk = 10, checkFees = false, ts = 5000, decimal = 1e9 } = opts;

    const payerAddr = payer.publicKey.toBase58();

    if (!values) {
      const wl = Array.isArray(wallets) ? wallets : [wallets];
      let _addrx = wl.map((wallet) => wallet.publicKey.toBase58());

      if (_addrx.length === 1 && Array.isArray(mints) && mints.length > 1) {
        _addrx = Array(mints.length).fill(_addrx[0]);
      }
      const bals = await SolGet.getInstance().splBalances(_addrx, mints);
      values = bals.map((bal) => bal.ui);
      check = false;
    }

    const fp = chunkSplTransferArray(wallets, receives, mints, values, chunk);
    if (!fp) return null;

    const { _wallets, _receives, _mints, _values, _addrs, addrx, mintx, valuex } = fp;

    if (check) {
      const bals = await SolGet.getInstance().splBalances(addrx, mintx, valuex);
      if (!bals) return null;
    }
    if (checkFees) {
      const xFees = await SolTransaction.getInstance().feeCal(payerAddr, _addrs, _receives, _mints);
      const feeBals = await SolGet.getInstance().solBalances([payerAddr], [xFees]);
      if (!feeBals) return null;
    }

    const txs: string[] = [];
    const cx = new Map();
    for (let i = 0; i < _wallets.length; i += 1) {
      const sr = await this.createSplRaw(
        payer,
        _wallets[i],
        _receives[i],
        _mints[i],
        _values[i],
        _addrs[i],
        cx,
        decimal,
      );

      if (!sr) return null;

      const tx = await sendAndConfirmRawTransaction(conn, sr.raw);
      txs.push(tx);
      this.logger.info(i, tx);

      await delay(ts * i);
    }

    return txs;
  }

  private async createSplRaw(
    payer: Keypair,
    _wallets: Keypair[],
    _receives: string[],
    _mints: string[],
    _values: number[],
    _addrs: string[],
    cx: any,
    decimal: number,
  ) {
    let fees = 0;
    const payerAddr = payer.publicKey.toBase58();
    const signers = [payer];
    const cc = new Map([[payerAddr, true]]);
    const transactions = new Transaction();

    transactions.feePayer = payer.publicKey;

    for (let i = 0; i < _wallets.length; i += 1) {
      if (_values[i] > 0) {
        const from = await SolGet.getInstance().getAssociatedTokenAddress(
          new PublicKey(_mints[i]),
          _wallets[i].publicKey,
        );
        const { to, inst } = await SolGet.getInstance().getOrCreateAta(
          payer.publicKey,
          new PublicKey(_mints[i]),
          new PublicKey(_receives[i]),
        );
        if (inst !== null && !cx.has(_receives[i])) {
          transactions.add(inst);
          cx.set(_receives[i], true);
          fees = new BN(fees).plus(0.00203928).toNumber();
        }
        const decimals: number = decimal || 1e9;
        transactions.add(
          createTransferInstruction(
            from,
            to.address || to,
            _wallets[i].publicKey,
            rx(new BN(_values[i]).multipliedBy(decimals).toNumber(), 0),
          ),
        );
        if (!cc.has(_addrs[i])) {
          signers.push(_wallets[i]);
          cc.set(_addrs[i], true);
        }
      }
    }
    if (transactions.instructions.length === 0) return null;
    fees = new BN(rx(new BN(signers.length).multipliedBy(0.000005).toNumber(), 6)).toNumber();

    fees = rx(fees, 8);

    const raws = await SolTransaction.getInstance().createRaw(transactions, signers, fees);

    return raws;
  }

  async createSolRaw(payer: Keypair, _wallets: Keypair[], _receives: string[], _values: number[], _addrs: string[]) {
    const payerAddr = payer.publicKey.toBase58();
    const signers = [payer];
    const cc = new Map([[payerAddr, true]]);
    const transactions = new Transaction();

    transactions.feePayer = payer.publicKey;

    for (let i = 0; i < _wallets.length; i += 1) {
      if (_values[i] > 0) {
        transactions.add(
          SystemProgram.transfer({
            fromPubkey: _wallets[i].publicKey,
            toPubkey: new PublicKey(_receives[i]),
            lamports: rx(new BN(_values[i]).multipliedBy(1e9).toNumber(), 0),
          }),
        );
        if (!cc.has(_addrs[i])) {
          signers.push(_wallets[i]);
          cc.set(_addrs[i], true);
        }
      }
    }
    if (transactions.instructions?.length === 0) return null;

    const fees = rx(new BN(signers.length).multipliedBy(0.000005).toNumber(), 6);

    const raw = await SolTransaction.getInstance().createRaw(transactions, signers, fees);
    return raw;
  }
}
