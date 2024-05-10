import { Either, Option, pipe } from "effect";

import type { RuntimeError } from "@root/types/RuntimeError";
import { intoError } from "@root/utils/into-error";
import { retrieveErrorMessage } from "@root/utils/retrieve-error-message";

import { HttpError } from "../http/HttpError";

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
