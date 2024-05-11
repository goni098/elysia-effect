import { VestingType } from "@prisma/client";
import type { Static } from "elysia";
import Elysia, { t } from "elysia";

import { ProjectRepository } from "@root/repositories/project.repository";
import { thunk } from "@root/shared/thunk";
import { UnionEnum } from "@root/shared/parser";

export const socials = t.Object({
  twitter: t.String({ minLength: 1 }),
  website: t.String({ minLength: 1 }),
  telegram: t.String({ minLength: 1 }),
  discord: t.String({ minLength: 1 })
});

export const token = t.Object({
  address: t.String({ format: "address" }),
  price: t.Union([t.String({ format: "bigint" }), t.Number()]),
  icon: t.String({ minLength: 1 }),
  name: t.String({ minLength: 1 }),
  symbol: t.String({ minLength: 1 }),
  totalSupply: t.String({ minLength: 1 })
});

export const launchpad = t.Object({
  startDate: t.Date(),
  snapshotDate: t.Date(),
  vestingDate: t.Date(),
  autoInvestDate: t.Date(),
  unlockPercent: t.Number(),
  percents: t.Array(t.Number()),
  times: t.Array(t.Union([t.String({ format: "bigint" }), t.Number()])),
  tge: t.Union([t.String({ format: "bigint" }), t.Number()]),
  cliffTime: t.Union([t.String({ format: "bigint" }), t.Number()]),
  linearTime: t.Union([t.String({ format: "bigint" }), t.Number()]),
  tokenOffer: t.Union([t.String({ format: "bigint" }), t.Number()]),
  tokenPrice: t.Union([t.String({ format: "bigint" }), t.Number()]),
  totalRaise: t.Union([t.String({ format: "bigint" }), t.Number()]),
  ticketSize: t.Union([t.String({ format: "bigint" }), t.Number()]),
  vestingType: t.Enum(VestingType)
});

export const launchpool = t.Object({
  startDate: t.Date(),
  snapshotDate: t.Date(),
  vestingDate: t.Date(),
  autoInvestDate: t.Date(),
  unlockPercent: t.Number(),
  percents: t.Array(t.Number()),
  times: t.Array(t.Union([t.String({ format: "bigint" }), t.Number()])),
  tge: t.Union([t.String({ format: "bigint" }), t.Number()]),
  cliffTime: t.Union([t.String({ format: "bigint" }), t.Number()]),
  linearTime: t.Union([t.String({ format: "bigint" }), t.Number()]),
  tokenReward: t.Union([t.String({ format: "bigint" }), t.Number()]),
  totalAirdrop: t.Union([t.String({ format: "bigint" }), t.Number()]),
  vestingType: UnionEnum(Object.values(VestingType))
});

export const body = t.Object({
  name: t.String({ minLength: 1 }),
  marketMaker: t.String({ minLength: 1 }),
  description: t.String({ minLength: 1 }),
  shortDescription: t.String({ minLength: 1 }),
  banner: t.String({ minLength: 1 }),
  logo: t.String({ minLength: 1 }),
  tags: t.Array(t.String({ minLength: 1 }), { minItems: 1 }),
  socials,
  token,
  launchpad,
  launchpool: t.Optional(launchpool)
});

export type CreateProjectPayload = Static<typeof body>;

export const createProject = new Elysia({
  name: "Handler.Admin.CreateProject"
}).post("/projects", ({ body }) => ProjectRepository.create(body).then(thunk), {
  body
});
