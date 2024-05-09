import { AnyHow } from "..";

export class BadRequestError extends Error implements AnyHow {
  readonly _tag = "BadRequestError";

  encodeHttp(): Error {
    return this;
  }
}
