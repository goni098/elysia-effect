import Elysia from "elysia";

import { authPlugin } from "@root/plugins/auth.plugin";
import { StakingContractService } from "@root/services/contracts/StakingContractService";

export const getPoolsStatistics = new Elysia({
  name: "Handler.User.GetPoolsStatistics"
})
  .use(authPlugin())
  .get("/pools-statistics", async ({ claims }) => {
    const { address } = claims;

    const { totalStaked, totalPoint, totalReward, balance } =
      await StakingContractService.getUserStakedInfo(address);

    return {
      tokenStaked: totalStaked.toString(),
      balance: balance.toString(),
      tokenRewards: totalReward.toString(),
      purrPoints: totalPoint.toString()
    };
  });
