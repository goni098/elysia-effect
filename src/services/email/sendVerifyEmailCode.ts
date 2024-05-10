import { SYSTEM_MAIL } from "@root/shared/env";

import { transporter } from "./config";

export const sendVerifyEmailCode = (email: string, code: string) =>
  transporter.sendMail({
    from: SYSTEM_MAIL,
    to: email,
    subject: `Purr need to verify your email`,
    html: `Your code ${code}`
  });
