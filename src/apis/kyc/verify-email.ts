import Elysia, { t } from "elysia";

import { HttpError } from "@root/errors/HttpError";
import { userVerifyEmailCodeKey } from "@root/helpers/redis";
import { authPlugin } from "@root/plugins/auth.plugin";
import { UserRepository } from "@root/repositories/user.repositoty";
import { sendVerifyEmailCode } from "@root/services/email/send-verify-email-code";
import { redis } from "@root/shared/redis";
import { randomDigits } from "@root/utils/random-digits";

export const verifyEmail = new Elysia({ name: "Handler.Kyc.VerifyEmail" })
  .use(authPlugin())
  .post(
    "/verify-email",
    async ({ claims, body }) => {
      const { address } = claims;
      const { email } = body;

      const user = await UserRepository.findByAddress(address);

      if (user?.email === email) {
        throw HttpError.BadRequest("email already existed");
      }

      const code = randomDigits(6);

      await redis.set(
        userVerifyEmailCodeKey(address),
        JSON.stringify({ code, email }),
        "EX",
        300
      );

      await sendVerifyEmailCode(email, code);

      return {};
    },
    {
      body: t.Object({
        email: t.String({ format: "email" })
      })
    }
  );
