import { intoError } from "@root/utils/into-error";
import { Either, Option, pipe } from "effect";
import { HttpError } from "../http/HttpError";
import { retrieveErrorMessage } from "@root/utils/retrieve-error-message";
import { RuntimeError } from "@root/types/RuntimeError";

export class DatabaseError implements RuntimeError {
  readonly _tag = "DatabaseError";

  constructor(private error: unknown) {}

  encodeHttp(): HttpError {
    console.error("DatabaseError: ", this.error);
    return pipe(
      this.error,
      intoError,
      retrieveErrorMessage,
      HttpError.Internal
    );
  }
}
