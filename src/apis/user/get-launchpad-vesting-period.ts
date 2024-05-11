import Elysia, { t } from "elysia";

import { HttpError } from "@root/errors/HttpError";
import { authPlugin } from "@root/plugins/auth.plugin";
import { LaunchpadRepository } from "@root/repositories/launchpad.repository";
import { LaunchpadSnapshotRepository } from "@root/repositories/launchpadSnapshot.repository";
import { VestingPoolRepository } from "@root/repositories/vestingPool.repository";

export const getLaunchpadVestingPeriod = new Elysia({
  name: "Handler.User.GetLaunchpadVestingPeriod"
})
  .use(authPlugin())
  .get(
    "/launchpad/:project_id/vesting-period",
    async ({ claims, params }) => {
      const projectId = params.project_id;
      const user = claims.address;

      const launchpad = await LaunchpadRepository.findByProjectId(projectId);

      if (!launchpad) {
        throw HttpError.Internal("launchpad not found");
      }

      if (!launchpad.vesting) {
        throw HttpError.BadRequest("vesting is not reached");
      }

      const [snapshot, pool] = await Promise.all([
        LaunchpadSnapshotRepository.findByProjectIdAndUser(projectId, user),
        VestingPoolRepository.findByProjectId(launchpad.projectId)
      ]);

      return {
        totalInvested: snapshot?.investedAmount,
        totalTokenReceived: snapshot?.tokenReceived,
        poolId: pool?.id,
        tge: launchpad.unlockPercent,
        vestingType: launchpad.vestingType
      };
    },
    {
      params: t.Object({
        project_id: t.String({ format: "uuid" })
      })
    }
  );
