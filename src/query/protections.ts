import {
  GET_ALL_CANCELLED_PROTECTION_BY_USER,
  GET_ALL_SUBMITTED_PROTECTION_BY_USER_AND_ACTION,
  GET_ALL_EXECUTED_PROTECTION_BY_USER_AND_ACTION,
} from "./graphql";
import { request } from "graphql-request";
import { subgraphUrl } from "../constants";
import { Protection } from "../types";

export const getSubmittedProtectionByUserAndAction = async (
  user: string,
  action: string
): Promise<Protection[]> => {
  const data = await request(
    subgraphUrl,
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
  return data.protections;
};

export const getCancelledProtectionByUser = async (
  user: string
): Promise<Protection[]> => {
  const data = await request(
    subgraphUrl,
    GET_ALL_CANCELLED_PROTECTION_BY_USER,
    {
      user: user.toLowerCase(),
    }
  );
  if (!data) throw new Error("getCancelledProtectionByUser: NO DATA");
  if (!data.protections)
    throw new Error("getCancelledProtectionByUser: NO PROTECTIONS FIELD");
  return data.protections;
};

export const getExecutedProtectionByUserAndAction = async (
  user: string,
  action: string
): Promise<Protection[]> => {
  const data = await request(
    subgraphUrl,
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
