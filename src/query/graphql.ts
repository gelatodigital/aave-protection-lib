import { gql } from "graphql-request";

export const GET_ALL_CANCELLED_PROTECTION_BY_OWNER = gql`
  query getCancelledProtectionByOwner($owner: String) {
    protections(where: { owner: $owner, state: cancelled }) {
      id
      taskID
      state
      taskHash
      taskType
      owner
      collateralToken
      debtToken
      rateMode
      wantedHealthFactor
      minimumHealthFactor
      executor
    }
  }
`;

export const GET_ALL_SUBMITTED_PROTECTION_BY_OWNER = gql`
  query getSubmittedProtectionByOwner($owner: String) {
    protections(where: { owner: $owner, state: submitted }) {
      id
      taskID
      state
      taskHash
      taskType
      owner
      collateralToken
      debtToken
      rateMode
      wantedHealthFactor
      minimumHealthFactor
      executor
    }
  }
`;

export const GET_ALL_EXECUTED_PROTECTION_BY_OWNER = gql`
  query getExecutedProtectionByOwner($owner: String) {
    protections(where: { owner: $owner, state: executed }) {
      id
      taskID
      state
      taskHash
      taskType
      owner
      collateralToken
      debtToken
      rateMode
      wantedHealthFactor
      minimumHealthFactor
      executor
    }
  }
`;
