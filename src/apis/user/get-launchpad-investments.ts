import Elysia from "elysia";

import { authPlugin } from "@root/plugins/auth.plugin";
import { LaunchpadRepository } from "@root/repositories/launchpad.repository";
import { pagedParams } from "@root/shared/parser";

export const getLaunchpadInvestments = new Elysia({
  name: "Handler.User.GetLaunchpadInvestments"
})
  .use(authPlugin())
  .get(
    "/launchpad/investments",
    async ({ claims, query }) => {
      const user = claims.address;

      const { launchpads, total } =
        await LaunchpadRepository.findInvestedByUser(user, query);

      const nodes = launchpads.map(launchpad => {
        const snapshot = launchpad.snapshots[0];

        return {
          tokenReceived: snapshot.tokenReceived,
          investedAmount: snapshot.investedAmount,
          project: launchpad.project
        };
      });

      return {
        total,
        page: query.page,
        nodes
      };
    },
    {
      query: pagedParams
    }
  );
