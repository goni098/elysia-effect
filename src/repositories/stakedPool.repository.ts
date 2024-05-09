import type { Prisma } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";
import type { DateTime } from "luxon";
import type { Address } from "viem";

import type { PaginatedQuery } from "@root/shared/parser";
import { prisma } from "@root/shared/prisma";

type CreatePoolParams = {
  itemId: string;
  lookup: number;
  amount: Decimal;
  point: Decimal;
  staker: string;
  endTime: DateTime;
};

type UnStakePoolParams = {
  itemId: string;
  lostPoint: Decimal;
  unStakedAmount: Decimal;
};

export abstract class StakedPoolRepository {
  static createPool({
    amount,
    itemId,
    lookup,
    point,
    staker,
    endTime
  }: CreatePoolParams) {
    return prisma.stakedPool.create({
      data: {
        id: itemId,
        amount,
        lookup,
        point,
        staker,
        endTime: endTime.toJSDate()
      }
    });
  }

  static unStakePool({ unStakedAmount, itemId, lostPoint }: UnStakePoolParams) {
    return prisma.stakedPool.update({
      where: {
        id: itemId
      },
      data: {
        amount: {
          decrement: unStakedAmount
        },
        point: {
          decrement: lostPoint
        }
      }
    });
  }

  static async findPagedByUser(user: Address, { page, take }: PaginatedQuery) {
    const filter: Prisma.StakedPoolWhereInput = {
      staker: user
    };

    const [nodes, total] = await Promise.all([
      prisma.stakedPool.findMany({
        take,
        skip: (page - 1) * take,
        where: filter
      }),
      prisma.stakedPool.count({
        where: filter
      })
    ]);

    return { nodes, total };
  }

  static async countAllStakers() {
    const totalRaw = await prisma.$queryRaw<[{ count: bigint }]>`
        SELECT count(*) FROM (
            SELECT DISTINCT staker 
            FROM "public"."staked_pool"
        )
    `;

    return totalRaw?.[0].count || BigInt(0);
  }
}
