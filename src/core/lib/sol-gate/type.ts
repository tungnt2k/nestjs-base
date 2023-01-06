export interface ResultMonitorCallback {
  depositId: number;
  address: string;
  value: number;
  mint?: string;
  ata: string;
  signature: string;
  slot: number;
}

export interface MNT {
  depositId: number;
  address: string;
  type: boolean;
  mnemonic: string;
  mint?: string;
  period?: number;
  value: number;
  balance?: number;
  minus?: boolean;
  endpoint?: string;
  dest?: string;
  derived?: number;
  [key: string]: any;
}

export interface ForwardSplData {
  derived: number;
  mint?: string;
  dest: string;
  depositId: number;
}

export interface OptionMonitor {
  cb?: (result: ResultMonitorCallback) => Promise<void>;
  mnts: MNT[];
}

export interface ResultMonitorSwapCallback {
  swapTranId: number;
  address: string;
  value: number;
  mint: string;
  ata: string;
  signature: string;
  slot: number;
}

export interface MNTSwap {
  swapTranId: number;
  swapAccId: number;
  address: string;
  mint?: string;
  type: boolean;
  period?: number;
  value?: number;
  balance?: number;
  minus?: boolean;
  endpoint?: string;
  dest?: string;
  derived?: number;
}

export interface ForwardSplSwapData {
  swapTranId: number;
}
