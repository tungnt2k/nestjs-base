/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/prefer-default-export */
import { programs } from '@metaplex/js';
import { getParsedNftAccountsByOwner, resolveToWalletAddress } from '@nfteyez/sol-rayz';
import {
  // @ts-ignore
  Account,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  // @ts-ignore
  createAssociatedTokenAccountInstruction,
  // @ts-ignore
  getAccount,
  TOKEN_PROGRAM_ID,
  // @ts-ignore
  TokenAccountNotFoundError,
  // @ts-ignore
  TokenInvalidAccountOwnerError,
  // @ts-ignore
  TokenInvalidMintError,
  // @ts-ignore
  TokenInvalidOwnerError,
} from '@solana/spl-token';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import BN from 'bignumber.js';

import { Logger, LoggerInterface } from './logger';
import { SolConnection } from './solConnection';
import { rx } from './utils';

const {
  metadata: { Metadata, MasterEdition, Edition },
} = programs;

export class SolGet {
  // @ts-ignore
  private logger: LoggerInterface;

  private connection: Connection;

  private static instance?: SolGet = undefined;

  constructor(_connection = SolConnection.getInstance().getConnection()) {
    this.logger = new Logger(__filename);
    this.connection = _connection;
  }

  public static getInstance(): SolGet {
    if (!this.instance) {
      this.instance = new SolGet();
    }

    return this.instance;
  }

  async getAssociatedTokenAddress(
    mint: PublicKey,
    owner: PublicKey,
    allowOwnerOffCurve = false,
    programId = TOKEN_PROGRAM_ID,
    associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID,
  ): Promise<PublicKey> {
    if (!allowOwnerOffCurve && !PublicKey.isOnCurve(owner.toBuffer())) throw new Error('TokenOwnerOffCurveError');

    const [address] = await PublicKey.findProgramAddress(
      [owner.toBuffer(), programId.toBuffer(), mint.toBuffer()],
      associatedTokenProgramId,
    );

    return address;
  }

  async getOrCreateAta(payerPublicKey: PublicKey, mint: PublicKey, owner: PublicKey, commitment = 'confirmed') {
    const associatedToken = await this.getAssociatedTokenAddress(mint, owner);
    let account;
    try {
      account = await getAccount(this.connection, associatedToken, commitment);
      if (!account.mint.equals(mint)) throw new TokenInvalidMintError();
      if (!account.owner.equals(owner)) throw new TokenInvalidOwnerError();
    } catch (error) {
      if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
        try {
          return {
            to: associatedToken,
            inst: createAssociatedTokenAccountInstruction(payerPublicKey, associatedToken, owner, mint),
          };
        } catch (err) {
          throw err;
        }
      } else {
        throw error;
      }
    }

    return {
      to: account,
      inst: null,
    };
  }

  async getTokenData(tokenMint: string, master = true) {
    const metadataPDA = await Metadata.getPDA(new PublicKey(tokenMint));
    const tokenMetadata = await Metadata.load(this.connection, metadataPDA);

    if (master) {
      const editionPDA = await MasterEdition.getPDA(new PublicKey(tokenMint));
      const tokenEdition = await MasterEdition.load(this.connection, editionPDA);

      return {
        addr: {
          metadata: metadataPDA.toString(),
          edition: editionPDA.toString(),
        },
        metadata: tokenMetadata.data,
        edition: tokenEdition.data,
      };
    }
    const editionPDA = await Edition.getPDA(new PublicKey(tokenMint));
    const tokenEdition = await Edition.load(this.connection, editionPDA);

    return {
      addr: {
        metadata: metadataPDA.toString(),
        edition: editionPDA.toString(),
      },
      metadata: tokenMetadata.data,
      edition: tokenEdition.data,
    };
  }

  async getAllNFT(addr: string, publisher: string) {
    const _metadata = await Metadata.findDataByOwner(this.connection, new PublicKey(addr));
    const metadata = _metadata.filter((metadata) => metadata.updateAuthority === publisher);
    return metadata;
  }

  async validNFT(tokenMint: string, ownerAddr: string) {
    const metadataPDA = await Metadata.getPDA(new PublicKey(tokenMint));
    const tokenMetadata = await Metadata.load(this.connection, metadataPDA);
    return tokenMetadata.data.updateAuthority === ownerAddr;
  }

  async getNftOwner(mint: string) {
    const largestAccounts = await this.connection.getTokenLargestAccounts(new PublicKey(mint));
    const largestAccountInfo = (await this.connection.getParsedAccountInfo(largestAccounts.value[0].address)) as any;

    return largestAccountInfo?.value?.data?.parsed?.info?.owner;
  }

  async getNumberOfNftHolders(mint: string) {
    const largestAccounts = await this.connection.getTokenLargestAccounts(new PublicKey(mint), 'max');
    if (!largestAccounts) return 0;

    return largestAccounts.value.length;
  }

  async getUserNft(publicKey: string) {
    const publicAddress = await resolveToWalletAddress({
      text: publicKey,
      connection: this.connection,
    });

    const nftArray = await getParsedNftAccountsByOwner({
      publicAddress,
      connection: this.connection,
    });

    return nftArray;
  }

  async checkOwnedNft(publicKey: string, mint: string) {
    const nftArr = await this.getUserNft(publicKey);

    if (!nftArr?.length) return false;

    const existMint = nftArr.find((i) => String(i.mint) === mint);

    if (existMint) return true;

    return false;
  }

  async getSolBalance(publicKey: string) {
    const bal = await this.connection.getBalance(new PublicKey(publicKey));
    return new BN(bal).dividedBy(new BN(LAMPORTS_PER_SOL)).toNumber();
  }

  async getBal(ata: PublicKey, mint?: string) {
    if (!mint) {
      const bal = await this.connection.getBalance(ata);

      return new BN(bal).dividedBy(1e9).toNumber();
    }
    const { value } = await this.connection.getTokenAccountBalance(ata);
    return value?.uiAmount || 0;
  }

  async getCg(account: Account, ata: PublicKey): Promise<number> {
    let { lamports } = account;
    const { data } = account;
    if (data.toString('base64') === '') {
      lamports = new BN(lamports).dividedBy(1e9).toNumber();
      return lamports;
    }
    const pai = await this.connection.getParsedAccountInfo(ata);
    // @ts-ignore
    return pai.value.data.parsed.info.tokenAmount.uiAmount;
  }

  async getAtas(addrs: string[], mints: string[] | string): Promise<Array<string>> {
    const atas: string[] = [];
    const cc = new Map();
    const multiMint = Array.isArray(mints);
    for (let i = 0; i < addrs.length; i += 1) {
      const _mint = multiMint ? mints[i] : mints;
      if (!cc.nget(addrs[i], _mint)) {
        const ata = await SolGet.getInstance().getAssociatedTokenAddress(new PublicKey(_mint), new PublicKey(addrs[i]));
        atas.push(ata.toBase58());
        cc.nset(ata.toBase58(), addrs[i], _mint);
      } else {
        atas.push(cc.nget(addrs[i], _mint));
      }
    }
    return atas;
  }

  async solBalances(addrs: string[], avails: number[] = []) {
    const bals = [];
    const cc = new Map();
    for (let i = 0; i < addrs.length; i += 1) {
      const avail = avails[i] === undefined ? 0 : avails[i];
      if (!cc.nget(addrs[i], 'balance')) {
        const amount = await this.connection.getBalance(new PublicKey(addrs[i]));
        bals.push({
          ui: rx(new BN(amount).dividedBy(1e9).toNumber(), 9),
          cal: amount,
        });
        cc.nincr(rx(new BN(amount).dividedBy(1e9).toNumber(), 9), addrs[i], 'balance');
        cc.nincr(avail, addrs[i], 'available');
      } else {
        bals.push({
          ui: 0,
          cal: 0,
        });
        cc.nincr(avail, addrs[i], 'available');
      }
      if (new BN(cc.nget(addrs[i], 'available')).gt(cc.nget(addrs[i], 'balance'))) return [];
    }
    return bals;
  }

  async splBalances(
    addrs: string[],
    mints: string[],
    avails: number[] = [],
  ): Promise<Array<{ cal: number; ui: number }>> {
    const bals = [];
    const cc = new Map();
    const multiMint = Array.isArray(mints);
    for (let i = 0; i < addrs.length; i += 1) {
      const _mint = multiMint ? mints[i] : mints;
      const avail = !avails[i] ? 0 : avails[i];
      if (!cc.nget(addrs[i], _mint, 'balance')) {
        const ata = await this.getAssociatedTokenAddress(new PublicKey(_mint), new PublicKey(addrs[i]));
        try {
          const { value } = await this.connection.getTokenAccountBalance(ata);
          bals.push({
            ui: value.uiAmount || 0,
            cal: Number(value.amount),
          });

          cc.nincr(value.uiAmount, addrs[i], _mint, 'balance');
          cc.nincr(Number(value.amount), addrs[i], _mint, 'cal');
          cc.nincr(avail, addrs[i], _mint, 'available');
        } catch (err) {
          bals.push({
            ui: 0,
            cal: 0,
          });
          cc.nincr(0, addrs[i], _mint, 'balance');
          cc.nincr(0, addrs[i], _mint, 'cal');
          cc.nincr(avail, addrs[i], _mint, 'available');
        }
      } else {
        bals.push({
          ui: 0,
          cal: 0,
        });
        cc.nincr(avail, addrs[i], _mint, 'available');
      }
      if (cc.nget(addrs[i], _mint, 'available') > cc.nget(addrs[i], _mint, 'balance')) return [];
    }

    return bals;
  }
}
