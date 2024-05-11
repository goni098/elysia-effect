import type { Static } from "elysia";
import Elysia, { t } from "elysia";

import { IdoFormRepository } from "@root/repositories/idoForm.repository";
import { thunk } from "@root/shared/thunk";

const body = t.Object({
  name: t.String({ minLength: 1 }),
  website: t.String({ minLength: 1 }),
  shortDescription: t.String({ minLength: 1 }),
  whitepaper: t.String({ minLength: 1 }),
  tokenomicsLink: t.String({ minLength: 1 }),
  smartContractAudit: t.String({ minLength: 1 }),
  contactEmail: t.String({ minLength: 1 }),
  teamMember: t.String({ minLength: 1 }),
  telegram: t.String({ minLength: 1 }),
  developmentStage: t.String({ minLength: 1 }),
  roadmap: t.String({ minLength: 1 }),
  previousFunding: t.String({ minLength: 1 }),
  choiceReason: t.String({ minLength: 1 }),
  additionalComment: t.String({ minLength: 1 })
});

export type SubmitIdoPayload = Static<typeof body>;

export const submitIdo = new Elysia({
  name: "Handler.Project.SubmitIdo"
}).post(
  "/submit-ido",
  ({ body }) => IdoFormRepository.create(body).then(thunk),
  {
    body
  }
);
