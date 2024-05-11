import Elysia from "elysia";

import { HttpError } from "@root/errors/HttpError";
import { ADMIN_ADDRESS } from "@root/shared/env";

import { authPlugin } from "./auth.plugin";

export const adminAuthPlugin = new Elysia({ name: "Plugin.AdminAuth" })
  .use(authPlugin())
  .derive({ as: "scoped" }, ({ claims }) => {
    if (claims?.address !== ADMIN_ADDRESS) {
      throw HttpError.Unauthorized();
    }
    return { claims };
  });
