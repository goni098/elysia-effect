import type { Address } from "viem";

import { prisma } from "@root/shared/prisma";
import { Effect } from "effect";
import { DatabaseError } from "@root/errors";

export abstract class LaunchpoolParticipantRepository {
  static findByUserAddressAndProjectId(user: Address, projectId: string) {
    return Effect.tryPromise({
      catch: error => new DatabaseError(error),
      try: () =>
        prisma.launchpoolParticipant.findUnique({
          where: {
            participantAddress_projectId: {
              projectId,
              participantAddress: user
            }
          }
        })
    });
  }

  static countParticipant(projectId: string) {
    return Effect.tryPromise({
      catch: error => new DatabaseError(error),
      try: () => prisma.$queryRaw<[{ count: bigint }]>`
        SELECT count(*) FROM (
            SELECT DISTINCT participant_address 
            FROM "public"."launchpool_participant"
            WHERE "project_id"::text = ${projectId}
        )`
    }).pipe(Effect.map(totalRaw => totalRaw?.[0].count || BigInt(0)));
  }
}
