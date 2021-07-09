import {
  GET_ALL_CANCELLED_PROTECTION_BY_USER,
  GET_ALL_SUBMITTED_PROTECTION_BY_USER,
  GET_ALL_EXECUTED_PROTECTION_BY_USER,
} from "./graphql";
import { request } from "graphql-request";
import { subgraphUrl } from "../constants";
import { Protection } from "../types";

export const getSubmittedProtectionByUser = async (
  user: string
): Promise<Protection[]> => {
  const data = await request(
    subgraphUrl,
    GET_ALL_SUBMITTED_PROTECTION_BY_USER,
    {
      GET_ALL_EXECUTED_PROTECTION_BY_USER: user.toLowerCase(),
    }
  );
  if (!data) throw new Error("getSubmittedProtectionByUser: NO DATA");
  if (!data.protections)
    throw new Error("getSubmittedProtectionByUser: NO PROTECTIONS FIELD");
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

export const getExecutedProtectionByUser = async (
  user: string
): Promise<Protection[]> => {
  const data = await request(subgraphUrl, GET_ALL_EXECUTED_PROTECTION_BY_USER, {
    user: user.toLowerCase(),
  });
  if (!data) throw new Error("getExecutedProtectionByUser: NO DATA");
  if (!data.protections)
    throw new Error("getExecutedProtectionByUser: NO PROTECTIONS FIELD");
  return data.protections;
};
