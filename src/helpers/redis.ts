import type { Address } from "viem";

export const userRefreshTokenKey = (address: Address) =>
  `refresh_token_${address}`;

export const userSignMessageKey = (address: Address) => `message_${address}`;

export const userVerifyEmailCodeKey = (address: Address) =>
  `verify_email_code_${address}`;
