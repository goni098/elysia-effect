import { consumeEffect } from "@root/helpers/consume-effect";
import { LaunchpadRepository } from "@root/repositories/launchpad.repository";
import { Effect, pipe } from "effect";
import Elysia, { Static, t } from "elysia";

const body = t.Object({
  vesting: t.Optional(t.Boolean()),
  autoInvest: t.Optional(t.Boolean()),
  finished: t.Optional(t.Boolean())
});

export type ChangeProjectStatusPayload = Static<typeof body>;

export const changeProjectStatus = new Elysia({
  name: "Handler.Admin.ChangeProjectStatus"
}).patch(
  "/projects/:project_id/change-status",
  ({ params, body }) =>
    pipe(
      LaunchpadRepository.changeStatus(params.project_id, body),
      Effect.asVoid,
      consumeEffect
    ),
  {
    params: t.Object({
      project_id: t.String({ minLength: 1 })
    }),
    body
  }
);
