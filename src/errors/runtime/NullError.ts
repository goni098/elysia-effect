import { InternalServerError } from "elysia";
import { AnyHow } from "..";

export class NullError implements AnyHow {
  readonly _tag = "NullError";

  constructor(private msg: string) {}

  encodeHttp(): Error {
    return new InternalServerError(this.msg);
  }
}
