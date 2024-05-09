export const intoError = (error: unknown) =>
  error instanceof Error ? error : new Error(JSON.stringify(error, null, 2));
