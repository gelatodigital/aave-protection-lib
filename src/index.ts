import { BigNumber, ContractTransaction, ethers } from "ethers";
import { addresses } from "./constants";
import { getAaveServices } from "./instances/contracts";
import {
  getSubmittedProtectionByUserAndAction,
  getCancelledProtectionByUserAndAction,
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
  provider: ethers.providers.Web3Provider
): Promise<boolean> => {
  return (
    (await getSubmittedOldProtection(provider)) !== undefined &&
    (await getSubmittedProtection(provider)) === undefined &&
    (await getCancelledProtection(provider)).length === 0 &&
    (await getExecutedProtection(provider)).length === 0
  );
};

export const hasUserUpgraded = async (
  provider: ethers.providers.Web3Provider
): Promise<boolean> => {
  return (
    (await getSubmittedProtection(provider)) !== undefined ||
    (await getCancelledProtection(provider)).length > 0 ||
    (await getExecutedProtection(provider)).length > 0
  );
};

export const upgradedUserStillHasDeprecatedProtection = async (
  provider: ethers.providers.Web3Provider
): Promise<boolean> => {
  return (
    (await hasUserUpgraded(provider)) &&
    (await getSubmittedOldProtection(provider)) !== undefined
  );
};

export const getSubmittedProtection = async (
  provider: ethers.providers.Web3Provider
): Promise<Protection | undefined> => {
  return await getSubmittedProtectionByUserAndAction(
    provider.network.chainId,
    await provider.getSigner().getAddress(),
    addresses(provider.network.chainId).ProtectionAction
  );
};

export const getSubmittedOldProtection = async (
  provider: ethers.providers.Web3Provider
): Promise<Protection | undefined> => {
  return getSubmittedProtectionByUserAndAction(
    provider.network.chainId,
    await provider.getSigner().getAddress(),
    addresses(provider.network.chainId).OldProtectionAction
  );
};

export const getCancelledProtection = async (
  provider: ethers.providers.Web3Provider
): Promise<Protection[]> => {
  return getCancelledProtectionByUserAndAction(
    provider.network.chainId,
    await provider.getSigner().getAddress(),
    addresses(provider.network.chainId).ProtectionAction
  );
};

export const getCancelledOldProtection = async (
  provider: ethers.providers.Web3Provider
): Promise<Protection[]> => {
  return getCancelledProtectionByUserAndAction(
    provider.network.chainId,
    await provider.getSigner().getAddress(),
    addresses(provider.network.chainId).OldProtectionAction
  );
};

export const getExecutedProtection = async (
  provider: ethers.providers.Web3Provider
): Promise<Protection[]> => {
  return getExecutedProtectionByUserAndAction(
    provider.network.chainId,
    await provider.getSigner().getAddress(),
    addresses(provider.network.chainId).ProtectionAction
  );
};

export const getExecutedOldProtection = async (
  provider: ethers.providers.Web3Provider
): Promise<Protection[]> => {
  return getExecutedProtectionByUserAndAction(
    provider.network.chainId,
    await provider.getSigner().getAddress(),
    addresses(provider.network.chainId).OldProtectionAction
  );
};
