import Elysia, { Static, t } from "elysia";
import {
  launchpad,
  launchpool,
  socials,
  token,
  body as createProjectPayload
} from "./create-project";
import { Effect, pipe } from "effect";
import { ProjectRepository } from "@root/repositories/project.repository";
import { consumeEffect } from "@root/helpers/consume-effect";

const body = t.Composite([
  t.Omit(createProjectPayload, ["launchpad", "launchpool", "soicals", "token"]),
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
    pipe(
      ProjectRepository.update(params.project_id, body),
      Effect.asVoid,
      consumeEffect
    ),
  {
    body
  }
);
