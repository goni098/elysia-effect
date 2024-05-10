import { Effect } from "effect";

export class HttpError extends Error {
  constructor(
    public code: number,
    public message: string,
    public options?: ErrorOptions
  ) {
    super(message, options);
  }

  public static BadRequest(message = "BadRequest") {
    return new HttpError(400, message);
  }

  public static Unauthorized(message = "Unauthorized") {
    return new HttpError(401, message);
  }

  public static Forbidden(message: "Forbidden") {
    return new HttpError(403, message);
  }

  public static Internal(message = "Internal Server Error") {
    return new HttpError(500, message);
  }

  public static FromUnauthorized(message = "Unauthorized") {
    return Effect.fail(this.Unauthorized(message));
  }
}
