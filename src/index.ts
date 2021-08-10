import { BigNumber, ContractTransaction, ethers } from "ethers";
import { addresses } from "./constants";
import { getAaveServices } from "./instances/contracts";
import {
  getSubmittedProtectionByUserAndAction,
  getCancelledProtectionByUser,
  getExecutedProtectionByUserAndAction,
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
): Promise<ContractTransaction> => {
  if (!isProtectionOK(colToken, debtToken, rateMode)) return Promise.reject();
  return getAaveServices(provider).submitTask(
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
): Promise<ContractTransaction> => {
  return getAaveServices(provider).cancelTask(
    addresses(provider.network.chainId).ProtectionAction
  );
};

export const cancelOldProtection = async (
  provider: ethers.providers.Web3Provider
): Promise<ContractTransaction> => {
  return getAaveServices(provider).cancelTask(
    addresses(provider.network.chainId).OldProtectionAction
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
): Promise<ContractTransaction> => {
  if (!isProtectionOK(colToken, debtToken, rateMode)) return Promise.reject();
  const aaveServices = getAaveServices(provider);
  const user = await provider.getSigner().getAddress();
  return aaveServices.updateTask(
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

export const isProtectionDeprecated = async (
  user: string
): Promise<boolean | null> => {
  const submittedTasks = await getSubmittedProtection(user);
  if (submittedTasks.length === 0) return null;
  return (
    submittedTasks[0].action ===
    addresses(137).OldProtectionAction.toLowerCase()
  );
};

export const getSubmittedProtection = async (
  user: string
): Promise<Protection[]> => {
  return getSubmittedProtectionByUserAndAction(
    user,
    addresses(137).ProtectionAction
  );
};

export const getCancelledProtection = async (
  user: string
): Promise<Protection[]> => {
  return getCancelledProtectionByUser(user);
};

export const getExecutedProtection = async (
  user: string
): Promise<Protection[]> => {
  return getExecutedProtectionByUserAndAction(
    user,
    addresses(137).ProtectionAction
  );
};

export const getSubmittedOldProtection = async (
  user: string
): Promise<Protection[]> => {
  return getSubmittedProtectionByUserAndAction(
    user,
    addresses(137).OldProtectionAction
  );
};

export const getExecutedOldProtection = async (
  user: string
): Promise<Protection[]> => {
  return getExecutedProtectionByUserAndAction(
    user,
    addresses(137).OldProtectionAction
  );
};
