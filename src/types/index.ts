import { BigNumber } from "@ethersproject/bignumber";
import { BytesLike } from "@ethersproject/bytes";

export enum ProtectionStatus {
  Submitted,
  Executed,
  Cancelled,
}

export enum TaskType {
  Protection = 0,
}

export interface Protection {
  id: BytesLike;
  status: ProtectionStatus;
  taskType: TaskType;
  owner: string;
  collateralToken: string;
  debtToken: string;
  rateMode: BigNumber;
  wantedHealthFactor: BigNumber;
  minimumHealthFactor: BigNumber;
  submittedTxHash: BytesLike;
  executedTxHash: BytesLike;
  cancelledTxHash: BytesLike;
  createdAt: BigNumber;
  updatedAt: BigNumber;
  createdAtBlock: BigNumber;
  updatedAtBlock: BigNumber;
  updatedAtBlockHash: BytesLike;
  executor: string;
  isPermanent: boolean;
}

export interface Addresses {
  Gelato: string;
  AaveServices: string;
  ProtectionAction: string;
  LendingPool: string;
}
