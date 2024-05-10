import { AppError } from "@root/types/AppError";
import { Effect, Either, identity, pipe } from "effect";

export const consumeEffect = <A, E extends AppError>(
  effect: Effect.Effect<A, E>
) =>
  pipe(effect, Effect.either, Effect.runPromise).then(
    Either.match({
      onLeft: error => {
        throw error.encodeHttp();
      },
      onRight: identity
    })
  );
