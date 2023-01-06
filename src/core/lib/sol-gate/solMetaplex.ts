/* eslint-disable import/prefer-default-export */
import { actions, NodeWallet } from '@metaplex/js';
import { Keypair, PublicKey } from '@solana/web3.js';

import { SolConnection } from './solConnection';
import { SolGet } from './solGet';
import { SolTransaction } from './solTransaction';

export class SolMetaplex {
  private arWallet: number[];

  private keypair: Keypair;

  constructor(mainWalletPrivateKey: number[]) {
    this.arWallet = mainWalletPrivateKey;
    this.keypair = Keypair.fromSecretKey(Uint8Array.from(this.arWallet));
  }

  async mint(uri: string, maxSupply = NaN) {
    const mintNFTResponse = await actions.mintNFT({
      connection: SolConnection.getInstance().getConnection(),
      wallet: new NodeWallet(this.keypair),
      uri,
      maxSupply,
    });

    const { txId, mint, metadata, edition } = mintNFTResponse;

    return {
      txId,
      mint: mint.toString(),
      metadata: metadata.toString(),
      edition: edition.toString(),
    };
  }

  async clone(tokenMint: string, walletKeypair: (number | string)[] = []) {
    const keypair = walletKeypair?.length ? Keypair.fromSecretKey(Uint8Array.from(this.arWallet)) : null;

    const cloneRes = await actions.mintEditionFromMaster({
      connection: SolConnection.getInstance().getConnection(),
      wallet: keypair ? new NodeWallet(keypair) : new NodeWallet(this.keypair),
      masterEditionMint: new PublicKey(tokenMint),
    });

    const { txId, mint, metadata, edition } = cloneRes;

    const confirmation = await SolTransaction.getInstance().awaitTransactionSignatureConfirmation(
      txId,
      30000,
      SolConnection.getInstance().getConnection(),
      'confirmed',
      true,
    );

    if (!confirmation) throw new Error('Timed out awaiting confirmation on transaction');
    if (confirmation.err) {
      throw new Error('Transaction failed: Custom instruction error');
    }

    return {
      txId,
      mint: mint.toString(),
      metadata: metadata.toString(),
      edition: edition.toString(),
    };
  }

  async burn(tokenMint: string) {
    const recipient = await SolGet.getInstance().getAssociatedTokenAddress(
      new PublicKey(tokenMint),
      this.keypair.publicKey,
    );

    const burnRes = await actions.burnToken({
      connection: SolConnection.getInstance().getConnection(),
      wallet: new NodeWallet(this.keypair),
      token: recipient,
      mint: new PublicKey(tokenMint),
      amount: 1,
    });

    return burnRes.txId;
  }
}
