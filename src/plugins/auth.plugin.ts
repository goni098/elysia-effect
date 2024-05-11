import { bearer } from "@elysiajs/bearer";
import Elysia from "elysia";

import { HttpError } from "@root/errors/HttpError";

import type { Claims } from "../types/Claims";
import { accessJwt } from "./jwt.plugin";

export const authPlugin = (options: "require" | "optional" = "require") =>
  new Elysia({
    name: "Plugin.Auth",
    seed: options
  })
    .use(bearer())
    .use(accessJwt)
    .derive({ as: "scoped" }, async ({ bearer, access }) => {
      const claims = await access.verify(bearer);

      if (!claims && options === "require") {
        throw HttpError.Unauthorized();
      }

      return {
        claims: claims as Claims
      };
    });
