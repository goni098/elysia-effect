export const isNill = (value: unknown): value is undefined | null =>
  value === undefined || value === null;
