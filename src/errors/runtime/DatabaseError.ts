import { InternalServerError } from "elysia";
import { AnyHow } from "..";
import { intoError } from "@root/utils/into-error";

export class DatabaseError implements AnyHow {
  readonly _tag = "DatabaseError";

  constructor(private error: unknown) {}

  encodeHttp(): Error {
    console.error(this.error);
    return new InternalServerError(intoError(this.error).message);
  }
}
