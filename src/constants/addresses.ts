import { Addresses } from "../types/index";

const maticAddresses: Addresses = {
  Gelato: "0x7598e84B2E114AB62CAB288CE5f7d5f6bad35BbA",
  AaveServices: "0x1547b3089F17B972907c5aAcc3b016369f099817",
  RefinanceAction: "0x2c3135aE53148441F1F99f22588564D5A1Cf37E8",
  LendingPool: "0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf",
  WETH: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
  WMatic: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
  AAVE: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
  DAI: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  WBTC: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
};

export const addresses = (chainId: number): Addresses => {
  switch (chainId) {
    case 137:
      return maticAddresses;
    default:
      return maticAddresses;
  }
};
