import { BigNumber } from "@ethersproject/bignumber";
import { BytesLike } from "@ethersproject/bytes";

export enum ProtectionStatus {
  Submitted,
  Executed,
  Cancelled,
}

export interface Protection {
  id: BytesLike;
  status: ProtectionStatus;
  user: string;
  protectionAction: string;
  submissionBlockNumber: BigNumber;
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
  colTokenAmountBefore: BigNumber;
  colTokenSwapAmount: BigNumber;
  colTokenAmountAfter: BigNumber;
  debtTokenAmountBefore: BigNumber;
  debtTokenRepaidAmount: BigNumber;
  debtTokenAmountAfter: BigNumber;
  healthFactorBefore: BigNumber;
  healthFactorAfter: BigNumber;
  protectionFee: BigNumber;
  isPermanent: boolean;
}

export interface Addresses {
  Gelato: string;
  AaveServices: string;
  ProtectionAction: string;
  LendingPool: string;
}
