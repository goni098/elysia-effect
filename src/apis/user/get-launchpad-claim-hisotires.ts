import Elysia, { t } from "elysia";

import { authPlugin } from "@root/plugins/auth.plugin";
import { LaunchpadSnapshotRepository } from "@root/repositories/launchpad-snapshot.repository";
import { TransactionRepository } from "@root/repositories/transaction.repository";
import { pagedParams } from "@root/shared/parser";

export const getLaunchpadClaimHistories = new Elysia({
  name: "GetLaunchpadClaimHistories"
})
  .use(authPlugin())
  .get(
    "/launchpad/:project_id/claim-histories",
    async ({ claims, params, query }) => {
      const projectId = params.project_id;
      const user = claims.address;

      const { nodes, total, totalClaimed } =
        await TransactionRepository.findPagedClaimByUserAndProject(
          user,
          projectId,
          query
        );

      const snapshot = await LaunchpadSnapshotRepository.findByProjectIdAndUser(
        projectId,
        user
      );

      return {
        totalReceived: snapshot?.tokenReceived,
        totalClaimed,
        page: query.take,
        total,
        nodes
      };
    },
    {
      params: t.Object({
        project_id: t.String({ format: "uuid" })
      }),
      query: pagedParams
    }
  );
