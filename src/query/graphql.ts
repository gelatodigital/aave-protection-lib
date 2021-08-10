import { gql } from "graphql-request";

export const GET_ALL_CANCELLED_PROTECTION_BY_USER_AND_ACTION = gql`
  query getCancelledProtectionByUserAndAction($user: String, $action: String) {
    protections(where: { user: $user, status: cancelled, action: $action }) {
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
      flashloanFee
      isPermanent
    }
  }
`;

export const GET_ALL_SUBMITTED_PROTECTION_BY_USER_AND_ACTION = gql`
  query getSubmittedProtectionByUserAndAction($user: String, $action: String) {
    protections(where: { user: $user, status: submitted, action: $action }) {
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
      flashloanFee
      isPermanent
    }
  }
`;

export const GET_ALL_EXECUTED_PROTECTION_BY_USER_AND_ACTION = gql`
  query getExecutedProtectionByUserAndAction($user: String, $action: String) {
    protections(where: { user: $user, status: executed, action: $action }) {
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
      flashloanFee
      isPermanent
    }
  }
`;
