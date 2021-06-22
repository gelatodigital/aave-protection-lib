import { BigNumber } from "@ethersproject/bignumber";
import { BytesLike } from "@ethersproject/bytes";

export enum ProtectionStatus {
  Submitted,
  Executed,
  Cancelled,
}

export enum TaskType {
  Refinance = 0,
}

export interface Protection {
  id: BytesLike;
  state: ProtectionStatus;
  taskHash: BytesLike;
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
}

export interface Addresses {
  Gelato: string;
  AaveServices: string;
  RefinanceAction: string;
  LendingPool: string;
}
