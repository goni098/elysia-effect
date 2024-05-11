import Elysia, { t } from "elysia";
import type { Address } from "viem";

import { HttpError } from "@root/errors/HttpError";
import { userRefreshTokenKey } from "@root/helpers/redis";
import { accessJwt, renewJwt } from "@root/plugins/jwt.plugin";
import { redis } from "@root/shared/redis";

export const renew = new Elysia({
  name: "Handler.User.Renew"
})
  .use(accessJwt)
  .use(renewJwt)
  .post(
    "/renew",
    async ({ body, access, renew }) => {
      const { refreshToken } = body;

      const subs = (await renew.verify(refreshToken)) as { id: Address };

      if (!subs) {
        throw HttpError.Unauthorized();
      }

      const address = subs.id;

      const token = await redis.get(userRefreshTokenKey(address));

      if (refreshToken !== token) {
        throw HttpError.Unauthorized();
      }

      const [accessToken, newRefreshToken] = await Promise.all([
        access.sign({
          address
        }),
        renew.sign({
          id: address
        })
      ]);

      await redis.set(userRefreshTokenKey(address), newRefreshToken);

      return {
        accessToken,
        refreshToken: newRefreshToken
      };
    },
    {
      body: t.Object({
        refreshToken: t.String({ minLength: 1 })
      })
    }
  );
