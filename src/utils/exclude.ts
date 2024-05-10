import { isNill } from "./is-nill";

export const exclude = <Model, Key extends keyof Model>(
  record: Model | null | undefined,
  keys: Key[]
): Omit<Model, Key> | undefined => {
  if (isNill(record)) {
    return undefined;
  }

  for (const key of keys) {
    delete record[key];
  }
  return record;
};
