/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-return-assign */
/* eslint-disable no-loop-func */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-new */
/* eslint-disable no-restricted-syntax */

import { AccountInfo, Connection, PublicKey } from '@solana/web3.js';
import axios from 'axios';
import BN from 'bignumber.js';
import { Redis } from 'ioredis';
import { chunk } from 'lodash';

import { isNumeric } from '.';

export const isAddrs = (_addrs: string | string[]): boolean => {
  let addrs = _addrs;
  if (typeof addrs === 'string') {
    addrs = [addrs];
  }
  for (const addr of addrs) {
    try {
      new PublicKey(addr);
    } catch (e) {
      return false;
    }
  }
  return true;
};

export const log = (...ls: any[]) => {
  console.log(...ls);
};

export const rx = (num: number, d: number) => {
  const [nat, dec] = num.toString().split('.');
  if (!dec) return Number(nat);
  return Number(`${nat}.${dec.slice(0, d)}`);
};

export const readUInt64 = (buff: Buffer, offset: number) => {
  const word0 = buff.readUInt32LE(offset);
  const word1 = buff.readUInt32LE(offset + 4);
  return new BN(word0).plus(new BN(word1).times(0x100000000));
};

export const typed = (buff: Buffer, type: string) => {
  switch (type) {
    case 'u8':
      return new BN(parseInt(buff.toString('hex'), 16));
    case 'u16':
      return new BN(buff.readUInt16LE(0));
    case 'u32':
      return new BN(buff.readUInt32LE(0));
    case 'u64':
      return readUInt64(buff, 0);
    case 'Pubkey':
      return new PublicKey(buff).toBase58();
    case 'COption<Pubkey>':

    // eslint-disable-next-line no-fallthrough
    default:
      return buff;
  }
};

export const unpack = (result: any, sizes: any, dgs: any, bk: any) => {
  if (!result) return bk;
  const raw = result.data;
  let start = 0;
  const nsize = [];
  for (let i = 0; i < sizes.length; i += 1) {
    nsize.push(raw.slice(start, start + sizes[i]));
    start += sizes[i];
  }
  const data = {};
  for (const dg of dgs) {
    // @ts-ignore
    data[dg.key] = typed(nsize[dg.index], dg.type);
  }
  return data;
};

export const batchRead = async (
  connection: Connection,
  addrs: string[],
  sizemap?: number[],
  filter?: Array<{ key: string; type: string; index: number }>,
) => {
  const pubAll = chunk(
    addrs.map((addr) => new PublicKey(addr)),
    99,
  );
  let results: AccountInfo<Buffer>[] = [];
  for (const pubs of pubAll) {
    const data = await connection.getMultipleAccountsInfo(pubs);
    // @ts-ignore
    results = results.concat(data);
  }

  const aggs =
    sizemap && filter
      ? results.map((result) => unpack(result, sizemap, filter, { amount: new BN(0) }))
      : results.map((result) => (result ? new BN(result.lamports) : new BN(0)));
  return aggs;
};

export const remove = async (redis: Redis, ata: PublicKey) => {
  await redis.srem('monitor', ata.toBase58());
  await redis.del(ata.toBase58());
};

export const hook = (endpoint: string, data: { [key: string]: string | number | undefined }) => {
  axios({
    method: 'post',
    url: endpoint,
    data,
  })
    .then((res) => {
      log('Push hook success: ', res.data);
    })
    .catch((err) => {
      log(err);
    });
};

export const format = (_mnt: { [key: string]: number | boolean | string | undefined }) => {
  const _mntn: {
    [key: string]: number | boolean | string | undefined;
  } = {};
  Object.keys(_mnt).map((key) => {
    if (_mnt[key] === '') return (_mntn[key] = undefined);
    if (isNumeric(_mnt[key])) return (_mntn[key] = Number(_mnt[key]));
    if (_mnt[key] === 'true') return (_mntn[key] = true);
    if (_mnt[key] === 'false') return (_mntn[key] = false);
    return (_mntn[key] = _mnt[key]);
  });
  return _mntn;
};
