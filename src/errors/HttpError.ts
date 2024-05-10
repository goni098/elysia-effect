import { AppError } from "@root/types/AppError";
import { Effect } from "effect";

export class HttpError extends Error implements AppError {
  readonly _tag = "HttpError";

  constructor(
    public code: number,
    public message: string,
    public options?: ErrorOptions
  ) {
    super(message, options);
  }

  public encodeHttp(): HttpError {
    return this;
  }

  static BadRequest(message = "Bad Request") {
    return new HttpError(400, message);
  }

  static Unauthorized(message = "Unauthorized") {
    return new HttpError(401, message);
  }

  static Forbidden(message: "Forbidden") {
    return new HttpError(403, message);
  }

  static Internal(message = "Internal Server Error") {
    return new HttpError(500, message);
  }

  static FromUnauthorized(message = "Unauthorized") {
    return Effect.fail(this.Unauthorized(message));
  }

  static FromInternal(message = "Internal Server Error") {
    return Effect.fail(this.Internal(message));
  }
}
