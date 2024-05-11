export class HttpError extends Error {
  constructor(
    public code: number,
    public message: string,
    public options?: ErrorOptions
  ) {
    super(message, options);
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
}
