import type { HttpError } from "@root/errors/HttpError";

export type AppError = {
  readonly _tag: string;
  encodeHttp(): HttpError;
};
