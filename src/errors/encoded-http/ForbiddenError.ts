import { AnyHow } from "..";

export class ForbiddenError extends Error implements AnyHow {
  readonly _tag = "ForbiddenError";

  encodeHttp(): Error {
    return this;
  }
}
