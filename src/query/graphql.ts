import { gql } from "graphql-request";

export const GET_ALL_CANCELLED_PROTECTION_BY_OWNER = gql`
  query getCancelledProtectionByOwner($owner: String) {
    protections(where: { owner: $owner, status: cancelled }) {
      id
      status
      taskHash
      taskType
      owner
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
    }
  }
`;

export const GET_ALL_SUBMITTED_PROTECTION_BY_OWNER = gql`
  query getSubmittedProtectionByOwner($owner: String) {
    protections(where: { owner: $owner, status: submitted }) {
      id
      status
      taskHash
      taskType
      owner
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
    }
  }
`;

export const GET_ALL_EXECUTED_PROTECTION_BY_OWNER = gql`
  query getExecutedProtectionByOwner($owner: String) {
    protections(where: { owner: $owner, status: executed }) {
      id
      status
      taskHash
      taskType
      owner
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
    }
  }
`;
