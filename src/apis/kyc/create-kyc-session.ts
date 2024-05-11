import { KycStatus } from "@prisma/client";
import Elysia from "elysia";

import { authPlugin } from "@root/plugins/auth.plugin";
import { KycVeriffSessionRepository } from "@root/repositories/kycVeriffSession.repositoty";
import { createKycVeriffSession } from "@root/services/veriff/create-kyc-veriff-session";

export const createKycSession = new Elysia({
  name: "Handler.Kyc.CreateKycSession"
})
  .use(authPlugin())
  .post(
    "/create-kyc-session",
    async ({ claims }) => {
      const { address } = claims;

      const kycVeriffResponse = await createKycVeriffSession();

      await KycVeriffSessionRepository.createKycVeriffSession({
        address,
        sessionId: kycVeriffResponse.verification.id,
        sessionUrl: kycVeriffResponse.verification.url,
        sessionToken: kycVeriffResponse.verification.sessionToken,
        kycStatus: KycStatus.STARTED
      });

      return {
        sessionId: kycVeriffResponse.verification.id,
        sessionUrl: kycVeriffResponse.verification.url,
        sessionToken: kycVeriffResponse.verification.sessionToken,
        kycStatus: KycStatus.STARTED
      };
    },
    {}
  );
