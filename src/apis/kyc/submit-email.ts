import Elysia, { t } from "elysia";

import { HttpError } from "@root/errors/HttpError";
import { userVerifyEmailCodeKey } from "@root/helpers/redis";
import { authPlugin } from "@root/plugins/auth.plugin";
import { UserRepository } from "@root/repositories/user.repositoty";
import { redis } from "@root/shared/redis";

export const submitEmail = new Elysia({
  name: "Handler.Kyc.SubmitEmail"
})
  .use(authPlugin())
  .post(
    "/submit-email",
    async ({ claims, body }) => {
      const { address } = claims;
      const { code } = body;

      const message = await redis.get(userVerifyEmailCodeKey(address));

      const emailAndCode = JSON.parse(message || "{}");

      if (emailAndCode.code !== code) {
        throw HttpError.Unauthorized();
      }

      await UserRepository.updateEmail(address, emailAndCode.email);

      return {
        address,
        email: emailAndCode.email
      };
    },
    {
      body: t.Object({
        code: t.String({ minLength: 1 })
      })
    }
  );
