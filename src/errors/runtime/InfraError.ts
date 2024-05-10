import { intoError } from "@root/utils/into-error";
import { retrieveErrorMessage } from "@root/utils/retrieve-error-message";
import { Effect, pipe } from "effect";
import { HttpError } from "../http/HttpError";
import { RuntimeError } from "@root/types/RuntimeError";

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
