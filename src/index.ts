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
  user: string
): Promise<boolean> => {
  return (
    (await getSubmittedOldProtection(user)) !== undefined &&
    (await getSubmittedProtection(user)) === undefined &&
    (await getCancelledProtection(user)).length === 0 &&
    (await getExecutedProtection(user)).length === 0
  );
};

export const userHasDeprecatedProtection = async (
  user: string
): Promise<boolean> => {
  return (
    (await getSubmittedOldProtection(user)) !== undefined &&
    (await getSubmittedProtection(user)) !== undefined
  );
};

export const getSubmittedProtection = async (
  user: string
): Promise<Protection> => {
  return (
    await getSubmittedProtectionByUserAndAction(
      user,
      addresses(137).ProtectionAction
    )
  )[0];
};

export const getCancelledProtection = async (
  user: string
): Promise<Protection[]> => {
  return getCancelledProtectionByUserAndAction(
    user,
    addresses(137).ProtectionAction
  );
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
): Promise<Protection> => {
  return (
    await getSubmittedProtectionByUserAndAction(
      user,
      addresses(137).OldProtectionAction
    )
  )[0];
};

export const getCancelledOldProtection = async (
  user: string
): Promise<Protection[]> => {
  return getCancelledProtectionByUserAndAction(
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
