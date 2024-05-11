import type { Address } from "viem";

import { prisma } from "@root/shared/prisma";

export abstract class LaunchpoolParticipantRepository {
  static findByUserAddressAndProjectId(user: Address, projectId: string) {
    return prisma.launchpoolParticipant.findUnique({
      where: {
        participantAddress_projectId: {
          projectId,
          participantAddress: user
        }
      }
    });
  }

  static async countParticipant(projectId: string) {
    const totalRaw = await prisma.$queryRaw<[{ count: bigint }]>`
            SELECT count(*) FROM (
                SELECT DISTINCT participant_address 
                FROM "public"."launchpool_participant"
                WHERE "project_id"::text = ${projectId}
            )
       `;

    return totalRaw?.[0].count || BigInt(0);
  }
}
