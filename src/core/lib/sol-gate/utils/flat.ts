/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Keypair } from '@solana/web3.js';
import { chunk } from 'lodash';

const allEqual = (arr: number[]) => arr.every((v) => v === arr[0]);

const valid = (vs: number[]) => {
  const nonZero = vs.filter((v) => v !== 0);
  if (!allEqual(nonZero)) return null;
  if (nonZero.length > 0) return nonZero[0];
  return 0;
};

const len = <T>(s: T) => {
  if (Array.isArray(s)) return s.length;
  if (s instanceof String || typeof s === 'string') return 0;
  return 0;
};

const fill = <T>(s: T | Array<T>, ms: number): Array<T> => {
  return !Array.isArray(s) ? Array<T>(ms).fill(s) : s;
};

const split = <T>(s: T | Array<T>, ms: number, c: number) => {
  return chunk(fill(s, ms), c);
};

const chunkSplTransferArray = (
  _wallets: Keypair[],
  _receives: string[],
  _mints: string[],
  _values: number[],
  chunk: number,
): {
  _wallets: Keypair[][];
  _receives: string[][];
  _mints: string[][];
  _values: number[][];
  _addrs: string[][];
  addrx: string[];
  mintx: string[];
  valuex: number[];
} | null => {
  const ms = valid([len(_wallets), len(_receives), len(_mints), len(_values)]);
  if (ms === null) return null;
  if (ms === 0)
    return {
      _wallets: [_wallets],
      _receives: [_receives],
      _mints: [_mints],
      _values: [_values],
      // @ts-ignore
      _addrs: [[_wallets.publicKey.toBase58()]],
      // @ts-ignore
      addrx: [_wallets.publicKey.toBase58()],
      mintx: _mints,
      valuex: _values,
    };

  const addrs = fill(_wallets, ms).map((wallet) => wallet.publicKey.toBase58());
  return {
    _wallets: split(_wallets, ms, chunk),
    _receives: split(_receives, ms, chunk),
    _mints: split(_mints, ms, chunk),
    _values: split(_values, ms, chunk),
    _addrs: split(addrs, ms, chunk),
    addrx: addrs,
    mintx: fill(_mints, ms),
    valuex: fill(_values, ms),
  };
};

const chunkSolTransferArray = (
  _wallets: Keypair[],
  _receives: string[],
  _values: number[],
  chunk: number,
): {
  _wallets: Keypair[][];
  _receives: string[][];
  _values: number[][];
  _addrs: string[][];
  addrx: string[];
  valuex: number[];
} | null => {
  const ms = valid([len(_wallets), len(_receives), len(_values)]);
  if (ms === null) return null;
  if (ms === 0)
    return {
      _wallets: [_wallets],
      _receives: [_receives],
      _values: [_values],
      _addrs: [_wallets.map((i) => i.publicKey.toBase58())],
      addrx: _wallets.map((i) => i.publicKey.toBase58()),
      valuex: _values,
    };
  const addrs = fill(_wallets, ms).map((wallet) => wallet.publicKey.toBase58());
  return {
    _wallets: split(_wallets, ms, chunk),
    _receives: split(_receives, ms, chunk),
    _values: split(_values, ms, chunk),
    _addrs: split(addrs, ms, chunk),
    addrx: addrs,
    valuex: fill(_values, ms),
  };
};

export { chunkSolTransferArray, chunkSplTransferArray, len };
