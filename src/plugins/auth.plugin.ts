import { bearer } from "@elysiajs/bearer";
import { Effect, pipe } from "effect";
import Elysia from "elysia";

import { HttpError } from "@root/errors/HttpError";
import { consumeEffect } from "@root/helpers/consume-effect";

import type { Claims } from "../types/Claims";
import { accessJwt } from "./jwt.plugin";
import { InfraError } from "@root/errors";

export const authPlugin = (options: "require" | "optional" = "require") =>
  new Elysia({
    name: "Plugin.Auth",
    seed: options
  })
    .use(bearer())
    .use(accessJwt)
    .derive({ as: "scoped" }, async ({ bearer, access }) =>
      pipe(
        Effect.tryPromise({
          catch: error => new InfraError(error),
          try: () => access.verify(bearer)
        }),
        Effect.flatMap(claims => {
          if (!claims && options === "require")
            return HttpError.FromUnauthorized();

          return Effect.succeed(claims as Claims);
        }),
        Effect.map(claims => ({
          claims
        })),
        consumeEffect
      )
    );
