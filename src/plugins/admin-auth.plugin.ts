import Elysia from "elysia";
import { authPlugin } from "./auth.plugin";
import { ADMIN_ADDRESS } from "@root/shared/env";
import { HttpError } from "@root/errors";

export const adminAuthPlugin = new Elysia({ name: "Plugin.AdminAuth" })
  .use(authPlugin())
  .derive({ as: "scoped" }, ({ claims }) => {
    if (claims?.address !== ADMIN_ADDRESS) {
      throw HttpError.Unauthorized();
    }
    return { claims };
  });
