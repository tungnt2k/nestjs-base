export enum SolanaNetwork {
  Mainnet = 'mainnet-beta',
  Testnet = 'testnet',
  Devnet = 'devnet',
}

export const redisKey = {
  SolMonitorAcc: 'SolMonitorAcc',
  SolMonitorAta: (ata: string) => `SolMonitorAta:${ata}`,
};
