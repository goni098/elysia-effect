import { KycStatus } from "@prisma/client";
import Elysia, { t } from "elysia";

import { authorizeVeriffDecisionWebhookPlugin } from "@root/plugins/authorize-veriff-decision-webhook";
import { KycVeriffSessionRepository } from "@root/repositories/kyc-veriff-session.repositoty";
import { VERIFF_KYC_STATUS_BY_VERIFF_CODE } from "@root/shared/constant";

export const decision = new Elysia({
  name: "Handler.Kyc.decision"
})
  .use(authorizeVeriffDecisionWebhookPlugin)
  .post(
    "/decision",
    async ({ body }) => {
      const { verification } = body;
      // Parser will throw error if the  payload.verification.code
      // is not present in VERIFF_KYC_STATUS_BY_VERIFF_CODE
      const kycStatus = VERIFF_KYC_STATUS_BY_VERIFF_CODE.get(
        verification.code
      )!;

      if (kycStatus === KycStatus.EXPIRED) {
        await KycVeriffSessionRepository.deleteKycVeriffStatusBySessionId(
          verification.id
        );
      } else {
        await KycVeriffSessionRepository.updateKycVeriffStatusBySessionId({
          sessionId: verification.id,
          kycStatus,
          reason: verification.reason ? verification.reason : undefined
        });
      }

      return {
        message: "Updated kyc status successfully"
      };
    },
    {
      body: t.Object({
        status: t.String(),
        verification: t.Object({
          id: t.String(),
          code: t.Number(),
          reason: t.Optional(t.String())
        })
      })
    }
  );
