import { prisma } from "@root/shared/prisma";

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
    return prisma.vestingPool.findUnique({
      where: {
        projectId
      }
    });
  }
}
