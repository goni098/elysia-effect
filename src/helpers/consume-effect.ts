import { AnyHow } from "@root/errors";
import { Effect, Either, identity, pipe } from "effect";

export const consumeEffect = <A, E extends AnyHow>(
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
