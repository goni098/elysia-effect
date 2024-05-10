import { readConfigOrExit } from "@root/helpers/read-config";
import type { Address } from "viem";
import { bsc, bscTestnet } from "viem/chains";

export const ACCESS_TOKEN_SECRET = readConfigOrExit("ACCESS_TOKEN_SECRET");

export const REFRESH_TOKEN_SECRET = readConfigOrExit("REFRESH_TOKEN_SECRET");

export const NETWORK = readConfigOrExit("NETWORK");

export const CHAIN = NETWORK === "testnet" ? bscTestnet : bsc;

export const RPC_URL_1 = readConfigOrExit("RPC_URL_1");
export const RPC_URL_2 = readConfigOrExit("RPC_URL_2");
export const RPC_URL_3 = readConfigOrExit("RPC_URL_3");

export const DEPOSIT_CONTRACT = readConfigOrExit<Address>("DEPOSIT_CONTRACT");

export const STAKING_CONTRACT = readConfigOrExit<Address>("STAKING_CONTRACT");

export const VESTING_CONTRACT = readConfigOrExit<Address>("VESTING_CONTRACT");

export const ADMIN_ADDRESS = readConfigOrExit<Address>("ADMIN_ADDRESS");

export const LOCKER_PK = readConfigOrExit("LOCKER_PK");

export const VERIFF_HOST = readConfigOrExit<string>("VERIFF_HOST");

export const VERIFF_API_KEY = readConfigOrExit<string>("VERIFF_API_KEY");

export const VERIFF_SECRET_KEY = readConfigOrExit<string>("VERIFF_SECRET_KEY");

export const VERIFF_CALLBACK_URL = readConfigOrExit<string>(
  "VERIFF_CALLBACK_URL"
);

export const SYSTEM_MAIL = readConfigOrExit("SYSTEM_MAIL");

export const SYSTEM_MAIl_PASSWORD = readConfigOrExit("SYSTEM_MAIl_PASSWORD");
