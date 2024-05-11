import Elysia from "elysia";

import { getKycStatus as getKyc } from "@root/components/get-kyc-status";
import { authPlugin } from "@root/plugins/auth.plugin";

export const getKycStatus = new Elysia({
  name: "Handler.Kyc.GetKycStatus"
})
  .use(authPlugin())
  .get("/kyc-status", ({ claims }) => getKyc(claims.address));
