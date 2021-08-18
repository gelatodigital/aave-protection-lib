import {
  GET_ALL_CANCELLED_PROTECTION_BY_USER_AND_ACTION,
  GET_ALL_SUBMITTED_PROTECTION_BY_USER_AND_ACTION,
  GET_ALL_EXECUTED_PROTECTION_BY_USER_AND_ACTION,
} from "./graphql";
import { request } from "graphql-request";
import { getSubgraphUrl } from "../constants";
import { Protection } from "../types";

export const getSubmittedProtectionByUserAndAction = async (
  chainId: number,
  user: string,
  action: string
): Promise<Protection | undefined> => {
  const data = await request(
    getSubgraphUrl(chainId),
    GET_ALL_SUBMITTED_PROTECTION_BY_USER_AND_ACTION,
    {
      user: user.toLowerCase(),
      action: action.toLowerCase(),
    }
  );
  if (!data) throw new Error("getSubmittedProtectionByUserAndAction: NO DATA");
  if (!data.protections)
    throw new Error(
      "getSubmittedProtectionByUserAndAction: NO PROTECTIONS FIELD"
    );
  return data.protections[0];
};

export const getCancelledProtectionByUserAndAction = async (
  chainId: number,
  user: string,
  action: string
): Promise<Protection[]> => {
  const data = await request(
    getSubgraphUrl(chainId),
    GET_ALL_CANCELLED_PROTECTION_BY_USER_AND_ACTION,
    {
      user: user.toLowerCase(),
      action: action.toLowerCase(),
    }
  );
  if (!data) throw new Error("getCancelledProtectionByUserAndAction: NO DATA");
  if (!data.protections)
    throw new Error(
      "getCancelledProtectionByUserAndAction: NO PROTECTIONS FIELD"
    );
  return data.protections;
};

export const getExecutedProtectionByUserAndAction = async (
  chainId: number,
  user: string,
  action: string
): Promise<Protection[]> => {
  const data = await request(
    getSubgraphUrl(chainId),
    GET_ALL_EXECUTED_PROTECTION_BY_USER_AND_ACTION,
    {
      user: user.toLowerCase(),
      action: action.toLowerCase(),
    }
  );
  if (!data) throw new Error("getExecutedProtectionByUserAndAction: NO DATA");
  if (!data.protections)
    throw new Error(
      "getExecutedProtectionByUserAndAction: NO PROTECTIONS FIELD"
    );
  return data.protections;
};
