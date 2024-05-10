import nodemailer from "nodemailer";

import { SYSTEM_MAIL, SYSTEM_MAIl_PASSWORD } from "@root/shared/env";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: SYSTEM_MAIL,
    pass: SYSTEM_MAIl_PASSWORD
  }
});
