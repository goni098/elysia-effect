import Elysia, { t } from "elysia";

import {
  retrieveLaunchStatus,
  retrieveSaleType
} from "@root/helpers/retrieve-launchpad-status";
import { ProjectRepository } from "@root/repositories/project.repository";
import { pagedParams } from "@root/shared/parser";

const query = t.Composite([
  pagedParams,
  t.Object({
    status: t.Optional(
      t.Union([t.Literal("ongoing"), t.Literal("upcoming"), t.Literal("ended")])
    )
  })
]);
export const getProjects = new Elysia({
  name: "Handler.Project.GetProjects"
}).get(
  "/",
  async ({ query }) => {
    const [nodes, total] = await ProjectRepository.findPaged(query);

    const projects = nodes.map(project => {
      const {
        launchpad,
        launchpool,
        id,
        name,
        logo,
        banner,
        shortDescription,
        tags,
        marketMaker,
        token
      } = project;

      const status = launchpad ? retrieveLaunchStatus(launchpad) : undefined;

      const saleType = retrieveSaleType(launchpad, launchpool);

      return {
        id,
        name,
        logo,
        banner,
        shortDescription,
        tags,
        saleType: saleType,
        marketMaker,
        token,
        launchpool,
        launchpad,
        status
      };
    });

    return {
      total,
      page: query.page,
      nodes: projects
    };
  },
  {
    query
  }
);
