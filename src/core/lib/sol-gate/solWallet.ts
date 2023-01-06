/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-loop-func */
/* eslint-disable import/prefer-default-export */

import { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';

export class SolWallet {
  // eslint-disable-next-line no-use-before-define
  private static instance?: SolWallet = undefined;

  public static getInstance(): SolWallet {
    if (this.instance === undefined) {
      this.instance = new SolWallet();
    }

    return this.instance;
  }

  restore(input: number[]) {
    const secretKey = Uint8Array.from(input);
    const wallet = Keypair.fromSecretKey(secretKey);
    return {
      wallet,
      address: wallet.publicKey.toBase58(),
      private: secretKey,
    };
  }

  create(mnemonic: string, derived = 0) {
    const derivedSeed = derivePath(`m/44'/501'/${derived}'/0'`, bip39.mnemonicToSeedSync(mnemonic).toString()).key;
    const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
    const wallet = Keypair.fromSecretKey(secretKey);
    return {
      wallet,
      address: wallet.publicKey.toBase58(),
      private: secretKey,
    };
  }
}
