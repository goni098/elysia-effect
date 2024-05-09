import Elysia, { t } from "elysia";

export const getMessage = new Elysia({ name: "Handler.GetMessage" }).get(
  "/message",
  () => {},
  {
    query: t.Object({ address: t.String({ minLength: 1 }) })
  }
);
