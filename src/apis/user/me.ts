import Elysia from "elysia";

import { authPlugin } from "@root/plugins/auth.plugin";
import { ENDPOINT } from "@root/shared/constant";

export const me = new Elysia({
  name: "Handler.Me"
})
  .use(authPlugin)
  .get(ENDPOINT.USER.ME, ({ claims }) => {
    return claims;
  });
