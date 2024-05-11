import { parseEther } from "viem";

export const calculateTier = (pPoint: bigint) => {
  if (pPoint >= parseEther("100000")) {
    return 6;
  }

  if (pPoint >= parseEther("60000")) {
    return 5;
  }

  if (pPoint >= parseEther("30000")) {
    return 4;
  }

  if (pPoint >= parseEther("10000")) {
    return 3;
  }

  if (pPoint >= parseEther("4000")) {
    return 2;
  }

  if (pPoint >= parseEther("1000")) {
    return 1;
  }

  return 0;
};
