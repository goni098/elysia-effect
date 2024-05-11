import Elysia, { InternalServerError, t } from "elysia";

import { retrieveLaunchStatus } from "@root/helpers/retrieve-launchpad-status";
import { authPlugin } from "@root/plugins/auth.plugin";
import { LaunchpadParticipantRepository } from "@root/repositories/launchpadParticipant.repository";
import { LaunchpoolParticipantRepository } from "@root/repositories/launchpoolParticipant.repository";
import { ProjectRepository } from "@root/repositories/project.repository";

export const getProject = new Elysia({
  name: "Handler.Project.GetProject"
})
  .use(authPlugin("optional"))
  .get(
    "/:project_id",
    async ({ claims, params }) => {
      const { project_id } = params;

      const project = await ProjectRepository.findById(project_id);

      if (!project || !project.launchpad) {
        throw new InternalServerError("Project not found");
      }

      const { launchpad, launchpool, token, ...projectDetail } = project;

      const [launchpadTotalParticipants, launchpoolTotalParticipants] =
        await Promise.all([
          LaunchpadParticipantRepository.countParticipant(project_id),
          LaunchpoolParticipantRepository.countParticipant(project_id)
        ]);

      let launchpadUser;
      let launchpoolUser;

      if (claims?.address) {
        const { address } = claims;

        const [isJoinedLaunchpad, isJoinedLaunchpool] = await Promise.all([
          LaunchpadParticipantRepository.findByUserAddressAndProjectId(
            address,
            project_id
          ),
          LaunchpoolParticipantRepository.findByUserAddressAndProjectId(
            address,
            project_id
          )
        ]);

        launchpadUser = {
          address,
          joined: !!isJoinedLaunchpad
        };

        launchpoolUser = {
          address,
          bnbConnected: 0,
          reward: 0,
          joined: !!isJoinedLaunchpool
        };
      }

      const totalCommitted =
        await LaunchpadParticipantRepository.findTotalCommitted(project_id);

      const _launchpad = {
        startDate: launchpad.startDate,
        snapshotDate: launchpad.snapshotDate,
        autoInvestDate: launchpad.autoInvestDate,
        vestingDate: launchpad.vestingDate,
        tokenOffered: launchpad.tokenOffer,
        totalRaise: launchpad.totalRaise,
        ticketSize: launchpad.ticketSize,
        totalCommitted: totalCommitted.toString(),
        participants: launchpadTotalParticipants.toString(),
        user: launchpadUser
      };

      const _launchpool = launchpool
        ? {
            startDate: launchpool.startDate,
            snapshotDate: launchpool.snapshotDate,
            autoInvestDate: launchpool.autoInvestDate,
            vestingDate: launchpool.vestingDate,
            tokenRewards: launchpool.tokenReward,
            totalBnbConnected: 219561395,
            totalAirdrop: launchpool.totalAirdrop,
            participants: launchpoolTotalParticipants.toString(),
            user: launchpoolUser
          }
        : undefined;

      return {
        ...projectDetail,
        status: retrieveLaunchStatus(launchpad),
        token,
        launchpad: _launchpad,
        launchpool: _launchpool
      };
    },
    {
      params: t.Object({
        project_id: t.String({ format: "uuid" })
      })
    }
  );
