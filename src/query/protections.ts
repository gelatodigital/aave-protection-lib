import {
  GET_ALL_CANCELLED_PROTECTION_BY_USER_AND_ACTION,
  GET_ALL_SUBMITTED_PROTECTION_BY_USER_AND_ACTION,
  GET_ALL_EXECUTED_PROTECTION_BY_USER_AND_ACTION,
} from "./graphql";
import { request } from "graphql-request";
import { subgraphUrl } from "../constants";
import { Protection } from "../types";

export const getSubmittedProtectionByUserAndAction = async (
  user: string,
  action: string
): Promise<Protection | undefined> => {
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
  return data.protections[0];
};

export const getCancelledProtectionByUserAndAction = async (
  user: string,
  action: string
): Promise<Protection[]> => {
  const data = await request(
    subgraphUrl,
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
