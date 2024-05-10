import type { KycStatus } from "@prisma/client";
import { Effect } from "effect";

import { DatabaseError } from "@root/errors/DatabaseError";
import { prisma } from "@root/shared/prisma";

type CreateKycVeriffSessionParams = {
  address: string;
  sessionId: string;
  sessionUrl: string;
  sessionToken: string;
  kycStatus: KycStatus;
  reason?: string;
};

export abstract class KycVeriffSessionRepository {
  static createKycVeriffSession({
    address,
    sessionId,
    sessionToken,
    sessionUrl,
    kycStatus,
    reason
  }: CreateKycVeriffSessionParams) {
    return Effect.tryPromise({
      try: () =>
        prisma.kycVeriffSession.create({
          data: {
            address,
            sessionId,
            sessionToken,
            sessionUrl,
            kycStatus,
            reason
          }
        }),
      catch: error => new DatabaseError(error)
    });
  }

  static getLatestKycVeriffSessionByAddress(address: string) {
    return Effect.tryPromise({
      try: () =>
        prisma.kycVeriffSession.findFirst({
          where: { address },
          orderBy: {
            createdDate: "desc"
          }
        }),
      catch: error => new DatabaseError(error)
    });
  }

  static updateKycVeriffStatusBySessionId({
    sessionId,
    kycStatus,
    reason
  }: Pick<CreateKycVeriffSessionParams, "sessionId" | "kycStatus" | "reason">) {
    return prisma.kycVeriffSession.update({
      where: {
        sessionId
      },
      data: {
        kycStatus,
        reason
      }
    });
  }

  static deleteKycVeriffStatusBySessionId(sessionId: string) {
    return prisma.kycVeriffSession.delete({
      where: {
        sessionId
      }
    });
  }
}
