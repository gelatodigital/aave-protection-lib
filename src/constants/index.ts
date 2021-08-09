import { Addresses } from "../types";

const maticAddresses: Addresses = {
  Gelato: "0x7598e84B2E114AB62CAB288CE5f7d5f6bad35BbA",
  AaveServices: "0x18FAbC997fDd624764E1974b283B1b904b66d613",
  ProtectionAction: "0x532929d3C37A35CF9FB6416e10E39d2D06A9E550",
  OldProtectionAction: "0xa0cE00D453b3d9EC0Ed4Cb55996a5127F3ADBc00",
  LendingPool: "0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf",
};

export const addresses = (chainId: number): Addresses => {
  switch (chainId) {
    case 137:
      return maticAddresses;
    default:
      throw new Error(`CHAIN_ID ${chainId} NOT SUPPORTED`);
  }
};

export const subgraphUrl =
  "https://api.thegraph.com/subgraphs/name/gelatodigital/aave-protection-subgraph";
