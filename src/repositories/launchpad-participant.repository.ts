import type { Address } from "viem";

import { StakingContractService } from "@root/services/contracts/StakingContractService";
import { prisma } from "@root/shared/prisma";

export abstract class LaunchpadParticipantRepository {
  static findByUserAddressAndProjectId(user: Address, projectId: string) {
    return prisma.launchpadParticipant.findUnique({
      where: {
        participantAddress_projectId: {
          projectId,
          participantAddress: user
        }
      }
    });
  }

  static findAllByProjectId(projectId: string) {
    return prisma.launchpadParticipant.findMany({
      where: {
        projectId
      }
    });
  }

  static async countParticipant(projectId: string) {
    const totalRaw = await prisma.$queryRaw<[{ count: bigint }]>`
        SELECT count(*) FROM (
            SELECT DISTINCT participant_address 
            FROM "public"."launchpad_participant"
            WHERE "project_id"::text = ${projectId}
        )
   `;

    return totalRaw?.[0].count || BigInt(0);
  }

  static create(user: Address, projectId: string) {
    return prisma.launchpadParticipant.create({
      data: {
        projectId,
        participantAddress: user
      }
    });
  }

  static async findTotalCommitted(projectId: string) {
    const allParticipants = await prisma.launchpadParticipant.findMany({
      select: {
        participantAddress: true
      },
      where: {
        projectId
      }
    });

    const totalCommitted = await Promise.all(
      allParticipants.map(async ({ participantAddress }) => {
        const { totalStaked } = await StakingContractService.getUserStakedInfo(
          participantAddress as Address
        );

        return totalStaked;
      })
    ).then(data => data.reduce((prev, curr) => prev + curr, BigInt(0)));

    return totalCommitted;
  }
}
