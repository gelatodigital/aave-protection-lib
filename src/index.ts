import { BigNumber, ethers } from "ethers";
import { addresses } from "./constants";
import { getAaveServices } from "./instances/contracts";
import {
  getSubmittedProtectionByOwner,
  getCancelledProtectionByOwner,
  getExecutedProtectionByOwner,
} from "./query/protections";
import { Protection, TaskType } from "./types";
import { isProtectionOK, encodeProtection } from "./utils";

export const submitProtection = async (
  provider: ethers.providers.Web3Provider,
  colToken: string,
  debtToken: string,
  rateMode: BigNumber,
  wantedHealthFactor: BigNumber,
  minimumHealthFactor: BigNumber
): Promise<void> => {
  if (!isProtectionOK(colToken, debtToken, rateMode)) return;
  getAaveServices(provider).submitTask(
    TaskType.Protection,
    addresses(provider.network.chainId).ProtectionAction,
    encodeProtection(
      colToken,
      debtToken,
      rateMode,
      wantedHealthFactor,
      minimumHealthFactor,
      await provider.getSigner().getAddress()
    )
  );
};

export const cancelProtection = async (
  provider: ethers.providers.Web3Provider,
  id: BigNumber,
  colToken: string,
  debtToken: string,
  rateMode: BigNumber,
  wantedHealthFactor: BigNumber,
  minimumHealthFactor: BigNumber
): Promise<void> => {
  if (!isProtectionOK(colToken, debtToken, rateMode)) return;
  getAaveServices(provider).cancelTask(
    id,
    addresses(provider.network.chainId).ProtectionAction,
    encodeProtection(
      colToken,
      debtToken,
      rateMode,
      wantedHealthFactor,
      minimumHealthFactor,
      await provider.getSigner().getAddress()
    )
  );
};

export const getSubmittedProtection = async (
  owner: string
): Promise<Protection[]> => {
  return getSubmittedProtectionByOwner(owner);
};

export const getCancelledProtection = async (
  owner: string
): Promise<Protection[]> => {
  return getCancelledProtectionByOwner(owner);
};

export const getExecutedProtection = async (
  owner: string
): Promise<Protection[]> => {
  return getExecutedProtectionByOwner(owner);
};
