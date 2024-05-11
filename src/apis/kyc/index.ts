import Elysia from "elysia";

import { createKycSession } from "./create-kyc-session";
import { decision } from "./decision";
import { getKycStatus } from "./get-kyc-status";
import { submitEmail } from "./submit-email";
import { verifyEmail } from "./verify-email";

export const kyc = new Elysia({
  name: "Controller.Kyc",
  prefix: "kyc",
  detail: {
    tags: ["Kyc"]
  }
})
  .use(createKycSession)
  .use(decision)
  .use(getKycStatus)
  .use(submitEmail)
  .use(verifyEmail);
