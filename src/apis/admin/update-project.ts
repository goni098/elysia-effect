import type { Static } from "elysia";
import Elysia, { t } from "elysia";

import { ProjectRepository } from "@root/repositories/project.repository";
import { thunk } from "@root/shared/thunk";

import {
  body as createProjectPayload,
  launchpad,
  launchpool,
  socials,
  token
} from "./create-project";

const body = t.Composite([
  t.Omit(createProjectPayload, ["launchpad", "launchpool", "socials", "token"]),
  t.Object({
    launchpad: t.Optional(t.Partial(launchpad)),
    launchpool: t.Optional(t.Partial(launchpool)),
    socials: t.Optional(t.Partial(socials)),
    token: t.Optional(t.Partial(token))
  })
]);

export type UpdateProjectPayload = Static<typeof body>;

export const updateProject = new Elysia({
  name: "Handler.Admin.UpdateProject"
}).patch(
  "/project/:project_id",
  ({ body, params }) =>
    ProjectRepository.update(params.project_id, body).then(thunk),
  {
    body,
    params: t.Object({
      project_id: t.String({ format: "uuid" })
    })
  }
);
