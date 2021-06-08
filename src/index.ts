import { BigNumber, ethers } from "ethers";
import { addresses } from "./constants/addresses";
import { getAaveServices } from "./instances/contracts";

import { TaskType } from "./types";

export const submitRefinance = async (
  provider: ethers.providers.Web3Provider,
  colToken: string,
  debtToken: string,
  rateMode: BigNumber,
  wantedHealthFactor: BigNumber,
  minimumHealthFactor: BigNumber,
  user: string
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
      user,
    ]
  );
  getAaveServices(provider).submitTask(
    TaskType.Refinance,
    addresses(provider.network.chainId).RefinanceAction,
    data
  );
};
