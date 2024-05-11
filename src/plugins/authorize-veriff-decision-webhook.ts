import { createHmac } from "crypto";
import Elysia from "elysia";

import { HttpError } from "@root/errors/HttpError";
import { VERIFF_SECRET_KEY } from "@root/shared/env";

export const authorizeVeriffDecisionWebhookPlugin = new Elysia({
  name: "Plugin.AuthorizeVeriffDecisionWebhook"
}).onBeforeHandle(({ headers, body }) => {
  const xHmacSignatureHeader = headers?.["x-hmac-signature"];

  if (!xHmacSignatureHeader) {
    throw HttpError.Unauthorized();
  }

  const generatedHmacSignature = createHmac("sha256", VERIFF_SECRET_KEY)
    .update(Buffer.from(JSON.stringify(body), "utf8"))
    .digest("hex")
    .toLowerCase();

  if (xHmacSignatureHeader !== generatedHmacSignature) {
    throw HttpError.Unauthorized();
  }
});
