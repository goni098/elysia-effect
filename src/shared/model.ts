import type { Static } from "elysia";
import { t } from "elysia";

export type PagedQuery = Static<typeof pagedModel>;

export const pagedModel = t.Object({
  page: t.Numeric({
    minimum: 1
  }),
  take: t.Numeric({
    maximum: 300
  })
});
