import Elysia from "elysia";

import { getKycStatus } from "@root/components/get-kyc-status";
import { calculateTier } from "@root/helpers/calculate-tier";
import { authPlugin } from "@root/plugins/auth.plugin";
import { UserRepository } from "@root/repositories/user.repositoty";
import { StakingContractService } from "@root/services/contracts/StakingContractService";
import { ADMIN_ADDRESS } from "@root/shared/env";

export const me = new Elysia({
  name: "Handler.User.Me"
})
  .use(authPlugin())
  .get("/", async ({ claims }) => {
    const { address } = claims;
    const user = await UserRepository.findByAddress(address);

    if (!user) {
      return {};
    }

    const status = await getKycStatus(address);

    const { totalPoint, totalStaked, balance } =
      await StakingContractService.getUserStakedInfo(address);

    const tier = calculateTier(totalPoint);

    return {
      address: user.address,
      email: user.email,
      kycStatus: status.kycStatus,
      tier,
      totalPoint: totalPoint.toString(),
      admin: user.address === ADMIN_ADDRESS,
      balance: balance.toString(),
      totalStaked: totalStaked.toString()
    };
  });
