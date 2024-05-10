import { HttpError } from "@root/errors/http/HttpError";
import Elysia from "elysia";

export const errorPlugin = new Elysia({
  name: "Plugin.Error"
})
  .error({
    HttpError: HttpError
  })
  .onError(({ code, set, error }) => {
    if (code === "HttpError") {
      set.status = error.code;
    }

    return {
      message: error.message,
      cause: error.cause,
      name: error.name
    };
  });
