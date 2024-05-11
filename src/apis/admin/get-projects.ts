import type { Static } from "elysia";
import Elysia, { t } from "elysia";

import {
  retrieveLaunchStatus,
  retrieveSaleType
} from "@root/helpers/retrieve-launchpad-status";
import { ProjectRepository } from "@root/repositories/project.repository";
import { UnionEnum, pagedParams } from "@root/shared/parser";

const query = t.Composite([
  pagedParams,
  t.Object({
    status: t.Optional(UnionEnum(["ongoing", "upcoming", "ended"]))
  })
]);

export type GetProjectsParams = Static<typeof query>;

export const getProjects = new Elysia({
  name: "Handler.Admin.GetProjects"
}).get(
  "/projects",
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
