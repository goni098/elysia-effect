export const intoError = (error: unknown) =>
  error instanceof Error ? error : Error(JSON.stringify(error, null, 2));
