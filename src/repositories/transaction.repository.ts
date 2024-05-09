import type { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import type { DateTime } from "luxon";
import type { Address } from "viem";

import type { PaginatedQuery } from "@root/shared/parser";
import { prisma } from "@root/shared/prisma";

type CreateDepositTxParams = {
  address: string;
  amount: string;
  date: DateTime;
  txHash: string;
};

type CreateWithdrawTxParams = CreateDepositTxParams;

type CreateClaimFundParams = CreateDepositTxParams & {
  projectId: string;
};

export abstract class TransactionRepository {
  static createDepositTx({
    address,
    amount,
    date,
    txHash
  }: CreateDepositTxParams) {
    return prisma.transaction.create({
      data: {
        amount,
        date: date.toJSDate(),
        kind: "deposit",
        txHash,
        address
      }
    });
  }

  static createWithdrawTx({
    address,
    amount,
    date,
    txHash
  }: CreateWithdrawTxParams) {
    return prisma.transaction.create({
      data: {
        amount,
        date: date.toJSDate(),
        kind: "withdraw",
        txHash,
        address
      }
    });
  }

  static createClaimFundTx({
    address,
    amount,
    date,
    projectId,
    txHash
  }: CreateClaimFundParams) {
    return prisma.transaction.create({
      data: {
        address,
        amount,
        date: date.toJSDate(),
        kind: "claim_fund",
        txHash,
        projectId
      }
    });
  }

  static async findPagedClaimByUserAndProject(
    user: Address,
    projectId: string,
    { page, take }: PaginatedQuery
  ) {
    const filter: Prisma.TransactionWhereInput = {
      address: user,
      projectId,
      kind: "claim_fund"
    };

    const [nodes, total, { _sum }] = await Promise.all([
      prisma.transaction.findMany({
        where: filter,
        take,
        skip: (page - 1) * take
      }),
      prisma.transaction.count({
        where: filter
      }),
      prisma.transaction.aggregate({
        where: filter,
        _sum: {
          amount: true
        }
      })
    ]);

    return { nodes, total, totalClaimed: _sum.amount || new Decimal(0) };
  }
}
