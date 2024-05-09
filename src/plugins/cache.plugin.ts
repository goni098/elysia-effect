import { caching } from "cache-manager";
import Elysia from "elysia";

import { isNill } from "@root/utils/is-nill";
import { toBase64 } from "@root/utils/to-base64";

const memory = () =>
  caching("memory", {
    max: 100,
    ttl: 10 * 1000 /*milliseconds*/
  });

export const cachePlugin = async () =>
  new Elysia({
    name: "Plugin.Cache"
  }).decorate("memory", await memory());

export const autoCachingPlugin = new Elysia({
  name: "Plugin.AutoCaching"
})
  .use(cachePlugin())
  .onRequest(async ({ memory, request }) => {
    const key = toBase64(request.url);

    const value = await memory.get(key);

    if (!isNill(value)) {
      return value;
    }
  })
  .onAfterHandle({ as: "scoped" }, async ({ request, memory, response }) => {
    const key = toBase64(request.url);

    await memory.set(key, response);
  });
