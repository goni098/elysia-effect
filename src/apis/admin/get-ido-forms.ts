import { IdoStatus } from "@prisma/client";
import { consumeEffect } from "@root/helpers/consume-effect";
import { IdoFormRepository } from "@root/repositories/ido-form.repository";
import { pagedModel } from "@root/shared/model";
import { Effect, pipe } from "effect";
import Elysia, { Static, t } from "elysia";

const query = t.Composite([
  pagedModel,
  t.Object({
    status: t.Optional(t.Enum(IdoStatus))
  })
]);

export type GetIdoFormsParams = Static<typeof query>;

export const getIdoForms = new Elysia({
  name: "Handler.Admin.GetIdoForms"
}).get(
  "/ido-forms",
  ({ query }) =>
    pipe(
      IdoFormRepository.find(query),
      Effect.map(([nodes, total]) => ({
        total,
        page: query.page,
        nodes
      })),
      consumeEffect
    ),
  {
    query
  }
);
