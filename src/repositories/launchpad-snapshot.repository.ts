import type { Address } from "viem";

import { prisma } from "@root/shared/prisma";
import { Effect } from "effect";
import { DatabaseError } from "@root/errors";

type CreateLaunchpadSnapshotParams = {
  projectId: string;
  user: string;
  tokenReceived: bigint;
  investedAmount: bigint;
};

export abstract class LaunchpadSnapshotRepository {
  static create({
    investedAmount,
    projectId,
    tokenReceived,
    user
  }: CreateLaunchpadSnapshotParams) {
    return prisma.launchpadSnapshot.create({
      data: {
        projectId,
        user,
        tokenReceived: tokenReceived.toString(),
        investedAmount: investedAmount.toString()
      }
    });
  }

  static findByProjectIdAndUser(projectId: string, user: Address) {
    return prisma.launchpadSnapshot.findUnique({
      where: {
        projectId_user: {
          projectId,
          user
        }
      }
    });
  }

  static findAllByProjectId(projectId: string) {
    return Effect.tryPromise({
      catch: error => new DatabaseError(error),
      try: () =>
        prisma.launchpadSnapshot.findMany({
          where: {
            projectId
          }
        })
    });
  }
}
