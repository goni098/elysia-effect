import { RuntimeError } from "@root/types/RuntimeError";
import { HttpError } from "../http/HttpError";

export class NullError implements RuntimeError {
  readonly _tag = "NullError";

  constructor(private message: string) {}

  encodeHttp(): HttpError {
    return HttpError.Internal(this.message);
  }
}
