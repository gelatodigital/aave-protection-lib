import { Addresses } from "../types";

const maticAddresses: Addresses = {
  Gelato: "0x7598e84B2E114AB62CAB288CE5f7d5f6bad35BbA",
  AaveServices: "0xBF10B9b604C7a0507155eAE1a6045CADA86b8Ed7",
  ProtectionAction: "0xbB9BCCbE9Fe476677795528bDDdDe5A1110a0875",
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
