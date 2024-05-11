import Elysia, { InternalServerError, t } from "elysia";
import { DateTime } from "luxon";
import { formatEther, parseEther } from "viem";

import { HttpError } from "@root/errors/HttpError";
import { authPlugin } from "@root/plugins/auth.plugin";
import { LaunchpadParticipantRepository } from "@root/repositories/launchpad-participant.repository";
import { LaunchpadRepository } from "@root/repositories/launchpad.repository";
import { DepositContractService } from "@root/services/contracts/DepositContractService";
import { StakingContractService } from "@root/services/contracts/StakingContractService";

export const applyLaunchpad = new Elysia({
  name: "Handler.Project.ApplyLaunchpad"
})
  .use(authPlugin())
  .post(
    "/:project_id/launchpad/apply",
    async ({ params, claims }) => {
      const projectId = params.project_id;
      const user = claims.address;

      const launchpad = await LaunchpadRepository.findByProjectId(projectId);

      if (!launchpad) {
        throw new InternalServerError("launchpad not found");
      }

      if (launchpad.snapshotDate <= DateTime.now().toJSDate()) {
        throw HttpError.BadRequest("snapshot date reached");
      }

      const isJoined =
        await LaunchpadParticipantRepository.findByUserAddressAndProjectId(
          user,
          projectId
        );

      if (isJoined) {
        throw HttpError.BadRequest("already applied");
      }

      const { totalPoint } =
        await StakingContractService.getUserStakedInfo(user);

      // min tier = 1 (1000 point)
      if (totalPoint < parseEther("1000")) {
        throw HttpError.BadRequest(
          `tier is not enough, point is ${formatEther(totalPoint)}`
        );
      }

      const investmentBalance = await DepositContractService.getBalance(user);

      // mint = 100 USDT
      if (investmentBalance < parseEther("100")) {
        throw HttpError.BadRequest(
          `investment balance is not enough, balance is: ${formatEther(investmentBalance)}`
        );
      }

      /**
       * todo
       * need to check kyc v2
       */

      await LaunchpadParticipantRepository.create(user, projectId);

      return {};
    },
    {
      params: t.Object({
        project_id: t.String({ format: "uuid" })
      })
    }
  );
