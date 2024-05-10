import type { HttpError } from "@root/errors/http/HttpError";

export type RuntimeError = {
  readonly _tag: string;
  encodeHttp(): HttpError;
};
