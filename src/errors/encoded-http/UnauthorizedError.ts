import { AnyHow, ErrorArgs } from "..";
import { Effect } from "effect";

export class UnauthorizedError extends Error implements AnyHow {
  static from(...args: ErrorArgs) {
    return Effect.fail(new this(...args));
  }

  readonly _tag = "UnauthorizedError";

  encodeHttp(): Error {
    return this;
  }
}
