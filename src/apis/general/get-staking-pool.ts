import Elysia from "elysia";

import { StakedPoolRepository } from "@root/repositories/staked-pool.repository";
import { StakingContractService } from "@root/services/contracts/StakingContractService";

export const getStakingPool = new Elysia({
  name: "Handler.General.GetStakingPool"
}).get("staking-pool", async () => {
  const { avgAPY, totalStaked, totalReward } =
    await StakingContractService.getTotalStakedPool();

  const totalStakers = await StakedPoolRepository.countAllStakers();

  return {
    avgAPY: avgAPY.toString(),
    totalStaked: totalStaked.toString(),
    totalReward: totalReward.toString(),
    totalStakers: totalStakers.toString()
  };
});
