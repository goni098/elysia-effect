import { DatabaseError } from "@root/errors";
import { prisma } from "@root/shared/prisma";
import { Effect } from "effect";

export abstract class VestingPoolRepository {
  static create(poolId: string, projectId: string) {
    return prisma.vestingPool.create({
      data: {
        id: poolId,
        projectId
      }
    });
  }

  static findByPoolId(poolId: string) {
    return prisma.vestingPool.findUnique({
      where: {
        id: poolId
      }
    });
  }

  static findByProjectId(projectId: string) {
    return Effect.tryPromise({
      catch: error => new DatabaseError(error),
      try: () =>
        prisma.vestingPool.findUnique({
          where: {
            projectId
          }
        })
    });
  }
}
