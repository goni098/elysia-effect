import { KycStatus } from "@prisma/client";
import type { Address } from "viem";

import { KycVeriffSessionRepository } from "@root/repositories/kyc-veriff-session.repositoty";

export const getKycStatus = async (address: Address) => {
  const kycVeriffSession =
    await KycVeriffSessionRepository.getLatestKycVeriffSessionByAddress(
      address
    );

  let kycStatus: KycStatus = KycStatus.NOT_STARTED;

  if (
    !kycVeriffSession?.kycStatus ||
    kycVeriffSession.kycStatus === KycStatus.EXPIRED
  ) {
    kycStatus = KycStatus.NOT_STARTED;
  } else if (
    kycVeriffSession.kycStatus === KycStatus.STARTED ||
    kycVeriffSession.kycStatus === KycStatus.SUBMITTED ||
    kycVeriffSession.kycStatus === KycStatus.REVIEW ||
    kycVeriffSession.kycStatus === KycStatus.RESUBMISSION_REQUESTED
  ) {
    kycStatus = KycStatus.STARTED;
  } else {
    kycStatus = kycVeriffSession.kycStatus;
  }

  return {
    kycStatus
  };
};
