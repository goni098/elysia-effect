import jwt from "@elysiajs/jwt";

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@root/shared/env";

export const accessJwt = jwt({
  secret: ACCESS_TOKEN_SECRET,
  exp: "3d",
  name: "access"
});

export const renewJwt = jwt({
  secret: REFRESH_TOKEN_SECRET,
  exp: "1y",
  name: "renew"
});
