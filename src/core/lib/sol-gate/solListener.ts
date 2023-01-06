/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-restricted-syntax */
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { EventEmitter } from 'events';
import { Redis } from 'ioredis';
import { isNumber } from 'lodash';
import TypedEmitter from 'typed-emitter';

import { redisKey } from './enum';
import { Logger, LoggerInterface } from './logger';
import { SolConnection } from './solConnection';
import { SolGet } from './solGet';
import { SolTransfer } from './solTransfer';
import { SolWallet } from './solWallet';
import { ForwardSplData, MNT, ResultMonitorCallback } from './type';
import { format } from './utils';

type SolGateEvent = {
  monitorAcc: (mnt: MNT) => Promise<void>;
  forwardSpl: (data: ForwardSplData) => Promise<void>;
  valueChange: (data: ResultMonitorCallback) => Promise<void>;
  monitorAccExpired: (mnt: MNT, ata: string) => Promise<void>;
};

export class SolListener {
  private logger: LoggerInterface;

  event: TypedEmitter<SolGateEvent>;

  monitorList: Map<string, MNT>;

  monitorIntervalIds: Map<string, NodeJS.Timeout>;

  constructor(private readonly redis: Redis, private readonly mnemonic: string, private readonly keypair: Keypair) {
    this.logger = new Logger(__filename);

    this.event = new EventEmitter() as TypedEmitter<SolGateEvent>;
    this.monitorList = new Map();
    this.monitorIntervalIds = new Map();
  }

  async listen() {
    try {
      const connection = SolConnection.getInstance().getConnection();

      this.event.on('monitorAcc', async (mnt) => {
        try {
          await this.handlerMonitorAcc(connection, this.redis, mnt);
        } catch (err) {
          this.logger.error(err);
        }
      });

      this.event.on('forwardSpl', async (data) => {
        try {
          await this.processForwardSpl(data);
        } catch (err) {
          this.logger.error(err);
        }
      });

      this.event.on('monitorAccExpired', async (mnt, ata) => {
        try {
          await this.processMonitorAccExpired(mnt, ata);
        } catch (err) {
          this.logger.error(err);
        }
      });

      await this.reloadMonitor();
    } catch (error: any) {
      this.logger.error(error.message || error);
    }
  }

  async reloadMonitor() {
    // reload monitor account from redis
    const atas = await this.redis.smembers(redisKey.SolMonitorAcc);

    // eslint-disable-next-line no-restricted-syntax
    for await (const ata of atas) {
      const _mnt = await this.redis.hgetall(redisKey.SolMonitorAta(ata));
      const formattedMnt = format(_mnt) as any;

      this.event.emit('monitorAcc', formattedMnt);
    }
  }

  async handlerMonitorAcc(connection: Connection, redis: Redis, mnt: MNT) {
    const { address, mint, period, value, balance, dest, derived, depositId } = mnt;

    const ata = mint
      ? await SolGet.getInstance().getAssociatedTokenAddress(new PublicKey(mint), new PublicKey(address))
      : new PublicKey(address);

    const _balance = isNumber(balance) ? balance : await SolGet.getInstance().getBal(ata, mint);
    const _mnt = mnt;
    _mnt.balance = _balance;

    this.monitorList.set(ata.toBase58(), _mnt);

    await redis.sadd(redisKey.SolMonitorAcc, ata.toBase58());
    for (const key of Object.keys(mnt)) {
      await redis.hset(redisKey.SolMonitorAta(ata.toBase58()), key, mnt[key]);
    }

    const id = connection.onAccountChange(ata, async (account, context) => {
      try {
        const { slot } = context;
        const balCg = await SolGet.getInstance().getCg(account, ata);
        const cgv = new BigNumber(balCg).minus(_balance).toNumber();
        if (new BigNumber(cgv).gt(value)) {
          await connection.removeAccountChangeListener(id);
          await redis.srem(redisKey.SolMonitorAcc, ata.toBase58());
          await redis.del(redisKey.SolMonitorAta(ata.toBase58()));

          this.logger.info(`Remove listen ata account change with subscription ID : ${id}`);

          if (this.monitorIntervalIds.has(ata.toBase58())) {
            clearTimeout(this.monitorIntervalIds.get(ata.toBase58()));
          }

          this.monitorIntervalIds.delete(ata.toBase58());
          this.monitorList.delete(ata.toBase58());

          const tx = await connection.getSignaturesForAddress(ata, { limit: 1 }, 'confirmed');
          const result = {
            depositId,
            address,
            value: cgv,
            mint,
            ata: ata.toBase58(),
            signature: tx[0].signature,
            slot,
          };

          this.event.emit('valueChange', result);

          if (derived && dest) {
            this.event.emit('forwardSpl', { derived, mint, dest, depositId });
          }
        }
      } catch (err) {
        this.logger.error(err);
      }
    });

    const time = setTimeout(async () => {
      await connection.removeAccountChangeListener(id);
      this.monitorIntervalIds.delete(ata.toBase58());
      this.monitorList.delete(ata.toBase58());
      this.event.emit('monitorAccExpired', mnt, ata.toBase58());

      this.logger.info(`Remove listen ata account change with subscription ID : ${id}`);
    }, period);

    this.monitorIntervalIds.set(ata.toBase58(), time);

    this.logger.info(`Listen ata account change with subscription ID : ${id}`);
  }

  async processForwardSpl(data: ForwardSplData) {
    const { wallet } = SolWallet.getInstance().create(this.mnemonic, data.derived);

    if (data?.mint) {
      const rs = await SolTransfer.getInstance().sendSplToken(wallet, data.dest, data.mint, undefined, {
        payer: this.keypair,
      });

      if (rs) {
        this.logger.info(`Forward SPL token to ${data.dest} success with txId: ${rs.txId}`);
      }
    } else {
      const rs = await SolTransfer.getInstance().sendSol(wallet, data.dest, undefined, {
        payer: this.keypair,
      });

      if (rs) {
        this.logger.info(`Forward SOL to ${data.dest} success with txId: ${rs.txId}`);
      }
    }
  }

  async processMonitorAccExpired(data: MNT, ata: string) {
    await this.redis.srem(redisKey.SolMonitorAcc, ata);
    await this.redis.del(redisKey.SolMonitorAta(ata));
  }
}

export default SolListener;
