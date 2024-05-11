import { Decimal } from "@prisma/client/runtime/library";
import Elysia, { t } from "elysia";

import { HttpError } from "@root/errors/HttpError";
import { authPlugin } from "@root/plugins/auth.plugin";
import { LaunchpadRepository } from "@root/repositories/launchpad.repository";
import { LaunchpadParticipantRepository } from "@root/repositories/launchpadParticipant.repository";
import { LaunchpadSnapshotRepository } from "@root/repositories/launchpadSnapshot.repository";

export const getUserLaunchpadStatus = new Elysia({
  name: "Handler.Project.GetUserLaunchpadStatus"
})
  .use(authPlugin())
  .get(
    "/:project_id/launchpad/user-status",
    async ({ params, claims }) => {
      const projectId = params.project_id;
      const user = claims.address;

      const launchpad = await LaunchpadRepository.findByProjectId(projectId);

      if (!launchpad) {
        throw HttpError.Internal("launchpad not found");
      }

      const isJoined =
        await LaunchpadParticipantRepository.findByUserAddressAndProjectId(
          user,
          projectId
        );

      const defaultAmount = new Decimal(0);

      if (!isJoined) {
        return {
          status: "not_joined",
          result: {
            investedAmount: defaultAmount,
            tokenReceived: defaultAmount
          }
        };
      }

      const snapshot = await LaunchpadSnapshotRepository.findByProjectIdAndUser(
        projectId,
        user
      );

      if (!snapshot) {
        return {
          status: "pending",
          result: {
            investedAmount: defaultAmount,
            tokenReceived: defaultAmount
          }
        };
      }

      return {
        status: "snapped",
        autoInvest: launchpad.autoInvest,
        vesting: launchpad.vesting,
        finished: launchpad.finished,
        result: {
          investedAmount: snapshot.investedAmount,
          tokenReceived: snapshot.tokenReceived
        }
      };
    },
    {
      params: t.Object({
        project_id: t.String({ format: "uuid" })
      })
    }
  );
