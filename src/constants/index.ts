import { Addresses } from "../types";

const maticAddresses: Addresses = {
  Gelato: "0x7598e84B2E114AB62CAB288CE5f7d5f6bad35BbA",
  AaveServices: "0xcea4b531C089554F30aa5698BC288f33dA4d4D74",
  ProtectionAction: "0x73172aEBC14828cC7C138c806e199275f1479820",
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
