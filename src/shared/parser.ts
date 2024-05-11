import {
  FormatRegistry,
  Kind,
  TypeRegistry,
  TSchema,
  SchemaOptions
} from "@sinclair/typebox";
import type { Static } from "elysia";
import { t } from "elysia";
import { isAddress } from "viem";

FormatRegistry.Set("address", isAddress);
FormatRegistry.Set("bigint", value => typeof BigInt(value) === "bigint");

export type TUnionValue = string | number;
export interface TUnionEnum<T extends TUnionValue[] = []> extends TSchema {
  [Kind]: "UnionEnum";
  static: T[number];
  enum: T;
}

TypeRegistry.Set<TUnionEnum>("UnionEnum", (schema, value) => {
  return (
    (typeof value === "string" || typeof value === "number") &&
    schema.enum.includes(value as never)
  );
});

export function UnionEnum<T extends TUnionValue[]>(
  values: [...T],
  options: SchemaOptions = {}
) {
  const type = values.every(value => typeof value === "string")
    ? { type: "string" }
    : values.every(value => typeof value === "number")
      ? { type: "number" }
      : {}; // mixed string | number

  return {
    ...options,
    [Kind]: "UnionEnum",
    ...type,
    enum: values
  } as TUnionEnum<T>;
}

export type PagedParams = Static<typeof pagedParams>;

export const pagedParams = t.Object({
  page: t.Numeric({ minimum: 1, default: 1 }),
  take: t.Numeric({ maximum: 300, minimum: 1, default: 60 })
});
