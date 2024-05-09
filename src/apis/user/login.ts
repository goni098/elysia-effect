import Elysia, { t } from "elysia";

export const login = new Elysia({ name: "Handler.Login" }).post(
  "/login",
  () => {},
  {
    body: t.Object({
      message: t.String({ minLength: 1 }),
      signature: t.String({ minLength: 1 }),
      address: t.String({ minLength: 1 })
    })
  }
);
