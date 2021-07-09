import { utils, constants, BigNumber } from "ethers";

export const isProtectionOK = (
  colToken: string,
  debtToken: string,
  rateMode: BigNumber
): boolean => {
  return (
    utils.isAddress(colToken) &&
    utils.isAddress(debtToken) &&
    (rateMode.eq(constants.One) || rateMode.eq(constants.Two))
  );
};

export const encodeProtection = (
  colToken: string,
  debtToken: string,
  rateMode: BigNumber,
  wantedHealthFactor: BigNumber,
  minimumHealthFactor: BigNumber,
  user: string
): string => {
  return new utils.AbiCoder().encode(
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
};
