import { BigNumber, ethers } from "ethers";
import { addresses } from "./constants";
import { getAaveServices } from "./instances/contracts";
import {
  getSubmittedProtectionByOwner,
  getCancelledProtectionByOwner,
  getExecutedProtectionByOwner,
} from "./query/protections";
import { Protection, TaskType } from "./types";

export const submitProtection = async (
  provider: ethers.providers.Web3Provider,
  colToken: string,
  debtToken: string,
  rateMode: BigNumber,
  wantedHealthFactor: BigNumber,
  minimumHealthFactor: BigNumber
): Promise<void> => {
  if (
    !(
      ethers.utils.isAddress(colToken) &&
      ethers.utils.isAddress(debtToken) &&
      (rateMode === ethers.constants.One || rateMode === ethers.constants.Two)
    )
  )
    return;
  const data = new ethers.utils.AbiCoder().encode(
    ["address", "address", "uint256", "uint256", "uint256", "address"],
    [
      colToken,
      debtToken,
      rateMode,
      wantedHealthFactor,
      minimumHealthFactor,
      await provider.getSigner().getAddress(),
    ]
  );
  getAaveServices(provider).submitTask(
    TaskType.Refinance,
    addresses(provider.network.chainId).RefinanceAction,
    data
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
  if (
    !(
      ethers.utils.isAddress(colToken) &&
      ethers.utils.isAddress(debtToken) &&
      (rateMode === ethers.constants.One || rateMode === ethers.constants.Two)
    )
  )
    return;
  const data = new ethers.utils.AbiCoder().encode(
    ["address", "address", "uint256", "uint256", "uint256", "address"],
    [
      colToken,
      debtToken,
      rateMode,
      wantedHealthFactor,
      minimumHealthFactor,
      await provider.getSigner().getAddress(),
    ]
  );
  getAaveServices(provider).cancelTask(
    id,
    addresses(provider.network.chainId).RefinanceAction,
    data
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
