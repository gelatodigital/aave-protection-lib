import { ethers } from "ethers";
import { Addresses } from "../types";

const maticAddresses: Addresses = {
  Gelato: "0x7598e84B2E114AB62CAB288CE5f7d5f6bad35BbA",
  AaveServices: "0x18FAbC997fDd624764E1974b283B1b904b66d613",
  ProtectionAction: "0x532929d3C37A35CF9FB6416e10E39d2D06A9E550",
  OldProtectionAction: "0xa0cE00D453b3d9EC0Ed4Cb55996a5127F3ADBc00",
  LendingPool: "0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf",
};

const mainnetAddresses: Addresses = {
  Gelato: "0x3CACa7b48D0573D793d3b0279b5F0029180E83b6",
  AaveServices: "0xE3d373c78803C1d22cE96bdC43d47542835bBF42",
  ProtectionAction: "0x83c403eCC6393036d8e4e059fF18FabBc7C68c8F",
  OldProtectionAction: ethers.constants.AddressZero,
  LendingPool: "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9",
};

export const addresses = (chainId: number): Addresses => {
  switch (chainId) {
    case 1:
      return mainnetAddresses;
    case 137:
      return maticAddresses;
    default:
      throw new Error(`CHAIN_ID ${chainId} NOT SUPPORTED`);
  }
};

export const getSubgraphUrl = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return "https://api.thegraph.com/subgraphs/name/gelatodigital/aave-protection-subgraph-mainnet";
    case 137:
      return "https://api.thegraph.com/subgraphs/name/gelatodigital/aave-protection-subgraph";
    default:
      throw new Error(`CHAIN_ID ${chainId} NOT SUPPORTED`);
  }
};
