import { ethers } from "ethers";
import { AaveServices__factory } from "../contracts/types/factories/AaveServices__factory";
import { AaveServices } from "../contracts/types/AaveServices";
import { addresses } from "../constants/addresses";
import { Web3Provider } from "@ethersproject/providers";
import { LendingPool } from "../contracts/types/LendingPool";
import { LendingPool__factory } from "../contracts/types/factories/LendingPool__factory";
import { ERC20 } from "../contracts/types/ERC20";
import { ERC20__factory } from "../contracts/types/factories/ERC20__factory";

export const provider: ethers.providers.StaticJsonRpcProvider =
  new ethers.providers.StaticJsonRpcProvider(process.env.REACT_APP_URL);

export const getAaveServices = (provider: Web3Provider): AaveServices => {
  return AaveServices__factory.connect(
    addresses(provider.network.chainId).AaveServices,
    provider
  ).connect(provider.getSigner());
};

export const getLendingPool = (provider: Web3Provider): LendingPool => {
  return LendingPool__factory.connect(
    addresses(provider.network.chainId).LendingPool,
    provider
  );
};

export const getERC20 = (provider: Web3Provider, tokenAddr: string): ERC20 => {
  return ERC20__factory.connect(tokenAddr, provider);
};
