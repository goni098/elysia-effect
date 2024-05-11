import type { KycStatus } from "@prisma/client";

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
    return prisma.kycVeriffSession.create({
      data: {
        address,
        sessionId,
        sessionToken,
        sessionUrl,
        kycStatus,
        reason
      }
    });
  }

  static getLatestKycVeriffSessionByAddress(address: string) {
    return prisma.kycVeriffSession.findFirst({
      where: { address },
      orderBy: {
        createdDate: "desc"
      }
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
