import { VestingType } from "@prisma/client";
import type { Static } from "elysia";
import Elysia, { t } from "elysia";

import { ProjectRepository } from "@root/repositories/project.repository";
import { thunk } from "@root/shared/thunk";

export const socials = t.Object({
  twitter: t.String({ minLength: 1 }),
  website: t.String({ minLength: 1 }),
  telegram: t.String({ minLength: 1 }),
  discord: t.String({ minLength: 1 })
});

export const token = t.Object({
  address: t.String({ format: "address" }),
  price: t.BigInt(),
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
  times: t.Array(t.BigInt()),
  tge: t.BigInt(),
  cliffTime: t.BigInt(),
  linearTime: t.BigInt(),
  tokenOffer: t.BigInt(),
  tokenPrice: t.BigInt(),
  totalRaise: t.BigInt(),
  ticketSize: t.BigInt(),
  vestingType: t.Enum(VestingType)
});

export const launchpool = t.Object({
  startDate: t.Date(),
  snapshotDate: t.Date(),
  vestingDate: t.Date(),
  autoInvestDate: t.Date(),
  unlockPercent: t.Number(),
  percents: t.Array(t.Number()),
  times: t.Array(t.BigInt()),
  tge: t.BigInt(),
  cliffTime: t.BigInt(),
  linearTime: t.BigInt(),
  tokenReward: t.BigInt(),
  totalAirdrop: t.BigInt(),
  vestingType: t.Enum(VestingType)
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
