import Elysia, { t } from "elysia";
import { v4 as uuid } from "uuid";
import type { Address } from "viem";
import { hashMessage } from "viem";

import { userSignMessageKey } from "@root/helpers/redis";
import { redis } from "@root/shared/redis";

export const getMessage = new Elysia({ name: "Handler.GetMessage" }).get(
  "/message",
  async ({ query }) => {
    const message = hashMessage(uuid());
    const address = query.address as Address;

    await redis.set(userSignMessageKey(address), message, "EX", 300); // 5mins

    return {
      message
    };
  },
  {
    query: t.Object({
      address: t.String({ format: "address" })
    })
  }
);
