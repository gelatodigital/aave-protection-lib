import { BigNumber } from "@ethersproject/bignumber";
import { BytesLike } from "@ethersproject/bytes";

export enum TaskState {
  CheckPending,
  Executed,
  Cancelled,
}

export enum TaskType {
  Refinance = 0,
}

export interface RefinanceTask {
  state: TaskState;
  taskHash: BytesLike;
  taskType: TaskType;
  owner: string;
  id: BigNumber;
  payload: BytesLike;
}

export interface ERC20Currency {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}
