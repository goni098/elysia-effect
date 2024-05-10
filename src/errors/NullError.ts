import { AppError } from "@root/types/AppError";
import { HttpError } from "./HttpError";

export class NullError implements AppError {
  readonly _tag = "NullError";

  constructor(private message: string) {}

  public encodeHttp(): HttpError {
    return HttpError.Internal(this.message);
  }
}
