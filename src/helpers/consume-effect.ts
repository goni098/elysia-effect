import { Effect, Either, identity, pipe } from "effect";

import { HttpError } from "@root/errors/http/HttpError";
import type { RuntimeError } from "@root/types/RuntimeError";

export const consumeEffect = <A, E extends RuntimeError | HttpError>(
  effect: Effect.Effect<A, E>
) =>
  pipe(effect, Effect.either, Effect.runPromise).then(
    Either.match({
      onLeft: error => {
        if (error instanceof HttpError) {
          throw error;
        }
        throw error.encodeHttp();
      },
      onRight: identity
    })
  );
