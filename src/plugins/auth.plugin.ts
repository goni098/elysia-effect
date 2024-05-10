import { bearer } from "@elysiajs/bearer";
import { Effect, pipe } from "effect";
import Elysia from "elysia";

import { HttpError } from "@root/errors/http/HttpError";
import { InfraError } from "@root/errors/runtime/InfraError";
import { consumeEffect } from "@root/helpers/consume-effect";

import type { Claims } from "../types/Claims";
import { accessJwt } from "./jwt.plugin";

export const authPlugin = new Elysia({
  name: "Plugin.Auth"
})
  .use(bearer())
  .use(accessJwt)
  .derive({ as: "scoped" }, async ({ bearer, access }) => {
    return pipe(
      Effect.tryPromise({
        catch: error => new InfraError(error),
        try: () => access.verify(bearer)
      }),
      Effect.flatMap(claims => {
        if (!claims) return HttpError.FromUnauthorized();
        return Effect.succeed(claims as Claims);
      }),
      Effect.map(claims => ({
        claims
      })),
      consumeEffect
    );
  });
