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
  taskID: BigNumber;
  state: ProtectionStatus;
  taskHash: BytesLike;
  taskType: TaskType;
  owner: string;
  collateralToken: string;
  debtToken: string;
  rateMode: BigNumber;
  wantedHealthFactor: BigNumber;
  minimumHealthFactor: BigNumber;
  executor: string;
}

export interface Addresses {
  Gelato: string;
  AaveServices: string;
  RefinanceAction: string;
  LendingPool: string;
}
