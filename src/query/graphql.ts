import { gql } from "graphql-request";

export const GET_ALL_CANCELLED_PROTECTION_BY_USER = gql`
  query getCancelledProtectionByUser($user: String) {
    protections(where: { user: $user, status: cancelled }) {
      id
      status
      user
      action
      subBlockNumber
      collateralToken
      debtToken
      rateMode
      wantedHealthFactor
      minimumHealthFactor
      submittedTxHash
      executedTxHash
      cancelledTxHash
      createdAt
      updatedAt
      createdAtBlock
      updatedAtBlock
      updatedAtBlockHash
      executor
      colTokenAmountBefore
      colTokenSwapAmount
      colTokenAmountAfter
      debtTokenAmountBefore
      debtTokenRepaidAmount
      debtTokenAmountAfter
      healthFactorBefore
      healthFactorAfter
      protectionFee
      isPermanent
    }
  }
`;

export const GET_ALL_SUBMITTED_PROTECTION_BY_USER = gql`
  query getSubmittedProtectionByUser($user: String) {
    protections(where: { user: $user, status: submitted }) {
      id
      status
      user
      action
      subBlockNumber
      collateralToken
      debtToken
      rateMode
      wantedHealthFactor
      minimumHealthFactor
      submittedTxHash
      executedTxHash
      cancelledTxHash
      createdAt
      updatedAt
      createdAtBlock
      updatedAtBlock
      updatedAtBlockHash
      executor
      colTokenAmountBefore
      colTokenSwapAmount
      colTokenAmountAfter
      debtTokenAmountBefore
      debtTokenRepaidAmount
      debtTokenAmountAfter
      healthFactorBefore
      healthFactorAfter
      protectionFee
      isPermanent
    }
  }
`;

export const GET_ALL_EXECUTED_PROTECTION_BY_USER = gql`
  query getExecutedProtectionByUser($user: String) {
    protections(where: { user: $user, status: executed }) {
      id
      status
      user
      action
      subBlockNumber
      collateralToken
      debtToken
      rateMode
      wantedHealthFactor
      minimumHealthFactor
      submittedTxHash
      executedTxHash
      cancelledTxHash
      createdAt
      updatedAt
      createdAtBlock
      updatedAtBlock
      updatedAtBlockHash
      executor
      colTokenAmountBefore
      colTokenSwapAmount
      colTokenAmountAfter
      debtTokenAmountBefore
      debtTokenRepaidAmount
      debtTokenAmountAfter
      healthFactorBefore
      healthFactorAfter
      protectionFee
      isPermanent
    }
  }
`;
