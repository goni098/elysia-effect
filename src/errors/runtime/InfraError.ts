import { InternalServerError } from "elysia";
import { AnyHow } from "..";
import { intoError } from "@root/utils/into-error";

export class InfraError implements AnyHow {
  readonly _tag = "InfraError";

  constructor(private error: unknown) {}

  encodeHttp(): Error {
    console.error(this.error);
    return new InternalServerError(intoError(this.error).message);
  }
}
