import jwt from "@elysiajs/jwt";

import { JWT_ACCESS_SECRET, JWT_RENEW_SECRET } from "@root/shared/env";

export const accessJwt = jwt({
  secret: JWT_ACCESS_SECRET,
  exp: "3d",
  name: "access"
});

export const renewJwt = jwt({
  secret: JWT_RENEW_SECRET,
  exp: "1y",
  name: "renew"
});
