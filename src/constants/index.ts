import { Addresses } from "../types";

const maticAddresses: Addresses = {
  Gelato: "0x7598e84B2E114AB62CAB288CE5f7d5f6bad35BbA",
  AaveServices: "0xaaCf3a938cFf39833B39922cC8F587461e8677AF",
  ProtectionAction: "0x6dE00106E2D97B47389706F37e86477B021f00fe",
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
