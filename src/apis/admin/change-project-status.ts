import type { Static } from "elysia";
import Elysia, { t } from "elysia";

import { LaunchpadRepository } from "@root/repositories/launchpad.repository";
import { thunk } from "@root/shared/thunk";

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
    LaunchpadRepository.changeStatus(params.project_id, body).then(thunk),
  {
    params: t.Object({
      project_id: t.String({ format: "uuid" })
    }),
    body
  }
);
