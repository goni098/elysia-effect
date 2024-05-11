import { IdoStatus } from "@prisma/client";
import type { Static } from "elysia";
import Elysia, { t } from "elysia";

import { IdoFormRepository } from "@root/repositories/ido-form.repository";
import { pagedParams } from "@root/shared/parser";

const query = t.Composite([
  pagedParams,
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
    IdoFormRepository.find(query).then(([nodes, total]) => ({
      total,
      page: query.page,
      nodes
    })),
  {
    query
  }
);
