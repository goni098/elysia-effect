import { FormatRegistry } from "@sinclair/typebox";
import type { Static } from "elysia";
import { t } from "elysia";
import { isAddress } from "viem";

FormatRegistry.Set("address", isAddress);

export type PagedParams = Static<typeof pagedParams>;

export const pagedParams = t.Object({
  page: t.Numeric({ minimum: 1 }),
  take: t.Numeric({ maximum: 300, minimum: 1 })
});
