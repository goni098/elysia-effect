import type { Address } from "viem";

import { prisma } from "@root/shared/prisma";
import { Effect, pipe } from "effect";
import { DatabaseError } from "@root/errors";
import { StakingContractService } from "@root/services/contracts/StakingContractService";

export abstract class LaunchpadParticipantRepository {
  static findByUserAddressAndProjectId(user: Address, projectId: string) {
    return Effect.tryPromise({
      catch: error => new DatabaseError(error),
      try: () =>
        prisma.launchpadParticipant.findUnique({
          where: {
            participantAddress_projectId: {
              projectId,
              participantAddress: user
            }
          }
        })
    });
  }

  static findAllByProjectId(projectId: string) {
    return prisma.launchpadParticipant.findMany({
      where: {
        projectId
      }
    });
  }

  static countParticipant(projectId: string) {
    return Effect.tryPromise({
      catch: error => new DatabaseError(error),
      try: () => prisma.$queryRaw<[{ count: bigint }]>`
        SELECT count(*) FROM (
            SELECT DISTINCT participant_address 
            FROM "public"."launchpad_participant"
            WHERE "project_id"::text = ${projectId}
        )`
    }).pipe(Effect.map(totalRaw => totalRaw?.[0].count || BigInt(0)));
  }

  static create(user: Address, projectId: string) {
    return prisma.launchpadParticipant.create({
      data: {
        projectId,
        participantAddress: user
      }
    });
  }

  static async findAllParticipantsByProject(projectId: string) {
    return Effect.tryPromise({
      catch: error => new DatabaseError(error),
      try: () =>
        prisma.launchpadParticipant.findMany({
          select: {
            participantAddress: true
          },
          where: {
            projectId
          }
        })
    });
  }
}
