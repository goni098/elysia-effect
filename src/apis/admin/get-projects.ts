import { Launchpad, Launchpool } from "@prisma/client";
import { consumeEffect } from "@root/helpers/consume-effect";
import { retrieveLaunchStatus } from "@root/helpers/retrieveLaunchpadStatus";
import { ProjectRepository } from "@root/repositories/project.repository";
import { pagedModel } from "@root/shared/model";
import { exclude } from "@root/utils/exclude";
import { Effect, pipe } from "effect";
import Elysia, { Static, t } from "elysia";

const query = t.Composite([
  pagedModel,
  t.Object({
    status: t.Optional(
      t.Union([t.Literal("ongoing"), t.Literal("upcoming"), t.Literal("ended")])
    )
  })
]);

export type GetProjectsParams = Static<typeof query>;

export const getProjects = new Elysia({
  name: "Handler.Admin.GetProjects"
}).get(
  "/project/:project_id",
  ({ query }) =>
    pipe(
      ProjectRepository.find(query),
      Effect.map(([nodes, total]) => {
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

          const status = launchpad
            ? retrieveLaunchStatus(launchpad)
            : undefined;

          return {
            id,
            name,
            logo,
            banner,
            shortDescription,
            tags,
            saleType: saleType(launchpad, launchpool),
            marketMaker,
            token: exclude(token, ["projectId"]),
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
      }),
      consumeEffect
    ),
  {
    query
  }
);

const saleType = (
  launchpad: Launchpad | null,
  launchpool: Launchpool | null
) => {
  if (launchpad && launchpool) {
    return "launchpad && launchpool";
  }

  if (launchpad) {
    return "launchpad";
  }

  if (launchpool) {
    return "launchpool";
  }

  return "none";
};
