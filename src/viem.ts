import { createPublicClient, createWalletClient, fallback, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

import { CHAIN, LOCKER_PK, RPC_URL_1, RPC_URL_2, RPC_URL_3 } from "./env";

const transport = fallback([http(RPC_URL_1), http(RPC_URL_2), http(RPC_URL_3)]);

export const viemClient = createPublicClient({
  batch: {
    multicall: true
  },
  chain: CHAIN,
  transport
});

export const locker = privateKeyToAccount(`0x${LOCKER_PK}`);

export const lockerWalletClient = createWalletClient({
  account: privateKeyToAccount(`0x${LOCKER_PK}`),
  chain: CHAIN,
  transport
});
