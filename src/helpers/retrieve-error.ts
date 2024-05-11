import { intoError } from "@root/utils/into-error";

export const retrieveErrorMessage = (error: unknown) =>
  intoError(error).message;
