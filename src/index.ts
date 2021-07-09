import { BigNumber, ethers } from "ethers";
import { addresses } from "./constants";
import { getAaveServices } from "./instances/contracts";
import {
  getSubmittedProtectionByUser,
  getCancelledProtectionByUser,
  getExecutedProtectionByUser,
} from "./query/protections";
import { Protection } from "./types";
import { isProtectionOK, encodeProtection } from "./utils";

export const submitProtection = async (
  provider: ethers.providers.Web3Provider,
  colToken: string,
  debtToken: string,
  rateMode: BigNumber,
  wantedHealthFactor: BigNumber,
  minimumHealthFactor: BigNumber,
  isPermanent: boolean
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
    ),
    isPermanent
  );
};

export const cancelProtection = async (
  provider: ethers.providers.Web3Provider
): Promise<void> => {
  getAaveServices(provider).cancelTask(
    addresses(provider.network.chainId).ProtectionAction
  );
};

export const updateProtection = async (
  provider: ethers.providers.Web3Provider,
  colToken: string,
  debtToken: string,
  rateMode: BigNumber,
  wantedHealthFactor: BigNumber,
  minimumHealthFactor: BigNumber,
  isPermanent: boolean
): Promise<void> => {
  if (!isProtectionOK(colToken, debtToken, rateMode)) return;
  const aaveServices = getAaveServices(provider);
  const user = await provider.getSigner().getAddress();
  aaveServices.updateTask(
    addresses(provider.network.chainId).ProtectionAction,
    encodeProtection(
      colToken,
      debtToken,
      rateMode,
      wantedHealthFactor,
      minimumHealthFactor,
      user
    ),
    isPermanent
  );
};

export const getSubmittedProtection = async (
  user: string
): Promise<Protection[]> => {
  return getSubmittedProtectionByUser(user);
};

export const getCancelledProtection = async (
  user: string
): Promise<Protection[]> => {
  return getCancelledProtectionByUser(user);
};

export const getExecutedProtection = async (
  user: string
): Promise<Protection[]> => {
  return getExecutedProtectionByUser(user);
};
