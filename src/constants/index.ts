import { Addresses } from "../types";

const maticAddresses: Addresses = {
  Gelato: "0x7598e84B2E114AB62CAB288CE5f7d5f6bad35BbA",
  AaveServices: "0x428Bf6548e8075e544624C05160B08811e76273f",
  RefinanceAction: "0x885ea9fa41CfEBF3dEfeF0258e6804bbC76CE2ED",
  LendingPool: "0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf",
};

export const blockNumber = 15580964;

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
