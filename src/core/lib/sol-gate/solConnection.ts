/* eslint-disable no-use-before-define */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/prefer-default-export */
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { sample } from 'lodash';

import { SolanaNetwork } from './enum';
import { Logger, LoggerInterface } from './logger';

export class SolConnection {
  private logger: LoggerInterface;

  private network: SolanaNetwork;

  private providerUrl: string;

  private connection: Connection;

  private customRpcUrls: string[];

  private static instance?: SolConnection = undefined;

  constructor(_network = SolanaNetwork.Mainnet) {
    this.network = _network;
    this.logger = new Logger(__filename);
    this.providerUrl = clusterApiUrl(this.network);

    this.customRpcUrls = process.env.SOLANA_CUSTOM_RPC_URL ? String(process.env.SOLANA_CUSTOM_RPC_URL).split(',') : [];

    this.connection = new Connection(this.getRPC(), {
      commitment: 'confirmed',
      confirmTransactionInitialTimeout: 60000,
    });
  }

  public static getInstance(): SolConnection {
    if (this.instance === undefined) {
      this.instance = new SolConnection();
    }

    return this.instance;
  }

  getConnection(): Connection {
    try {
      this.connection = new Connection(this.getRPC(), {
        commitment: 'confirmed',
        confirmTransactionInitialTimeout: 60000,
      });

      return this.connection;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  getRPC(): string {
    if (this.customRpcUrls?.length) {
      const randRpc = sample<string>(this.customRpcUrls);

      return randRpc || this.providerUrl;
    }

    return this.providerUrl;
  }
}
