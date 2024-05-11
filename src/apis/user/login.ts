import Elysia, { t } from "elysia";
import type { Address } from "viem";
import { verifyMessage } from "viem";

import { HttpError } from "@root/errors/HttpError";
import { userRefreshTokenKey, userSignMessageKey } from "@root/helpers/redis";
import { accessJwt, renewJwt } from "@root/plugins/jwt.plugin";
import { UserRepository } from "@root/repositories/user.repositoty";
import { redis } from "@root/shared/redis";

type Payload = {
  address: Address;
  message: string;
  signature: Address;
};

export const login = new Elysia({ name: "Handler.User.Login" })
  .use(accessJwt)
  .use(renewJwt)
  .post(
    "/login",
    async ({ body, access, renew }) => {
      const { address, message, signature } = body as Payload;
      const key = userSignMessageKey(address);

      const msg = await redis.get(key);

      if (msg !== message) {
        throw HttpError.Unauthorized();
      }

      const isValid = await verifyMessage({
        address,
        message,
        signature
      });

      if (!isValid) {
        throw HttpError.Unauthorized();
      }

      await UserRepository.createIfNotExist(address);

      const [accessToken, refreshToken] = await Promise.all([
        access.sign({
          address
        }),
        renew.sign({
          id: address
        })
      ]);

      await redis.del(key);
      await redis.set(userRefreshTokenKey(address), refreshToken);

      return {
        accessToken,
        refreshToken
      };
    },
    {
      body: t.Object({
        message: t.String({ minLength: 1 }),
        signature: t.String({ minLength: 1 }),
        address: t.String({ format: "address" })
      })
    }
  );
