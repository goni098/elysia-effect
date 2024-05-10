import { Effect, pipe } from "effect";

import type { RuntimeError } from "@root/types/RuntimeError";
import { intoError } from "@root/utils/into-error";
import { retrieveErrorMessage } from "@root/utils/retrieve-error-message";

import { HttpError } from "../http/HttpError";

export class InfraError implements RuntimeError {
  readonly _tag = "InfraError";

  constructor(private error: unknown) {}

  encodeHttp(): HttpError {
    console.error("InfraError: ", this.error);
    return pipe(
      this.error,
      intoError,
      retrieveErrorMessage,
      HttpError.Internal
    );
  }
}
