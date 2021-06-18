import {
  GET_ALL_CANCELLED_PROTECTION_BY_OWNER,
  GET_ALL_SUBMITTED_PROTECTION_BY_OWNER,
  GET_ALL_EXECUTED_PROTECTION_BY_OWNER,
} from "./graphql";
import { request } from "graphql-request";
import { subgraphUrl } from "../constants";
import { Protection } from "../types";

export const getSubmittedProtectionByOwner = async (
  owner: string
): Promise<Protection[]> => {
  const data = await request(
    subgraphUrl,
    GET_ALL_SUBMITTED_PROTECTION_BY_OWNER,
    {
      owner: owner.toLowerCase(),
    }
  );
  if (!data) throw new Error("getSubmittedProtectionByOwner: NO DATA");
  if (!data.protections)
    throw new Error("getSubmittedProtectionByOwner: NO PROTECTIONS FIELD");
  return data.protections;
};

export const getCancelledProtectionByOwner = async (
  owner: string
): Promise<Protection[]> => {
  const data = await request(
    subgraphUrl,
    GET_ALL_CANCELLED_PROTECTION_BY_OWNER,
    {
      owner: owner.toLowerCase(),
    }
  );
  if (!data) throw new Error("getCancelledProtectionByOwner: NO DATA");
  if (!data.protections)
    throw new Error("getCancelledProtectionByOwner: NO PROTECTIONS FIELD");
  return data.protections;
};

export const getExecutedProtectionByOwner = async (
  owner: string
): Promise<Protection[]> => {
  const data = await request(
    subgraphUrl,
    GET_ALL_EXECUTED_PROTECTION_BY_OWNER,
    {
      owner: owner.toLowerCase(),
    }
  );
  if (!data) throw new Error("getExecutedProtectionByOwner: NO DATA");
  if (!data.protections)
    throw new Error("getExecutedProtectionByOwner: NO PROTECTIONS FIELD");
  return data.protections;
};
