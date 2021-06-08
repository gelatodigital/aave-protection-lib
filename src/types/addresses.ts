import config from "config";

interface Addresses {
  Gelato: string;
  AaveServices: string;
  RefinanceAction: string;
  LendingPool: string;
  WETH: string;
  WMatic: string;
  AAVE: string;
  DAI: string;
  USDC: string;
  USDT: string;
  WBTC: string;
}

export const addresses: Addresses = {
  Gelato: config.has("Addresses.Gelato") ? config.get("Addresses.Gelato") : "",
  AaveServices: config.has("Addresses.AaveServices")
    ? config.get("Addresses.AaveServices")
    : "",
  RefinanceAction: config.has("Addresses.RefinanceAction")
    ? config.get("Addresses.RefinanceAction")
    : "",
  LendingPool: config.has("Addresses.LendingPool")
    ? config.get("Addresses.LendingPool")
    : "",
  WETH: config.has("Addresses.WETH") ? config.get("Addresses.WETH") : "",
  WMatic: config.has("Addresses.WMatic") ? config.get("Addresses.WMatic") : "",
  AAVE: config.has("Addresses.AAVE") ? config.get("Addresses.AAVE") : "",
  DAI: config.has("Addresses.DAI") ? config.get("Addresses.DAI") : "",
  USDC: config.has("Addresses.USDC") ? config.get("Addresses.USDC") : "",
  USDT: config.has("Addresses.USDT") ? config.get("Addresses.USDT") : "",
  WBTC: config.has("Addresses.WBTC") ? config.get("Addresses.WBTC") : "",
};
