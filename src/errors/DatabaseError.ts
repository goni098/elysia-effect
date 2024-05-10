import { pipe } from "effect";

import { intoError } from "@root/utils/into-error";
import { retrieveErrorMessage } from "@root/utils/retrieve-error-message";

import { AppError } from "@root/types/AppError";
import { HttpError } from "./HttpError";

export class DatabaseError implements AppError {
  readonly _tag = "DatabaseError";

  constructor(private error: unknown) {}

  public encodeHttp(): HttpError {
    console.error("DatabaseError: ", this.error);
    return pipe(
      this.error,
      intoError,
      retrieveErrorMessage,
      HttpError.Internal
    );
  }
}
