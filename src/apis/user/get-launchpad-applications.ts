import Elysia from "elysia";

import { authPlugin } from "@root/plugins/auth.plugin";
import { LaunchpadRepository } from "@root/repositories/launchpad.repository";
import { pagedParams } from "@root/shared/parser";

export const getLaunchpadApplications = new Elysia({
  name: "Handler.User.GetLaunchpadApplications"
})
  .use(authPlugin())
  .get(
    "/launchpad/applications",
    async ({ claims, query }) => {
      const user = claims.address;

      const { launchpads, total } = await LaunchpadRepository.findAppliedByUser(
        user,
        query
      );

      const nodes = launchpads.map(launchpad => {
        const status = (() => {
          if (!launchpad.snapshots.length) {
            return "applied";
          }

          const snapshot = launchpad.snapshots[0];

          if (snapshot.tokenReceived.greaterThan(0)) {
            return "won";
          }

          return "lost";
        })();

        return {
          status,
          project: launchpad.project
        };
      });

      return {
        total,
        page: query.page,
        nodes: nodes
      };
    },
    {
      query: pagedParams
    }
  );
