import Elysia from "elysia";

import { authPlugin } from "@root/plugins/auth.plugin";
import { StakedPoolRepository } from "@root/repositories/staked-pool.repository";
import { pagedParams } from "@root/shared/parser";

export const getPools = new Elysia({
  name: "Handler.User.GetPools"
})
  .use(authPlugin())
  .get(
    "/pools",
    async ({ query, claims }) => {
      const user = claims.address;

      const { nodes, total } = await StakedPoolRepository.findPagedByUser(
        user,
        query
      );

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
