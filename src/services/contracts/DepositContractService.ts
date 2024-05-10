import type { Address, WatchContractEventOnLogsParameter } from "viem";

import { DEPOSIT_ABI } from "@root/contracts/deposit.abi";
import { DEPOSIT_CONTRACT } from "@root/shared/env";
import { locker, lockerWalletClient, viemClient } from "@root/shared/viem";

export type DepositEvent = WatchContractEventOnLogsParameter<
  typeof DEPOSIT_ABI,
  "Deposit"
>[number];

export abstract class DepositContractService {
  static getDepositEvents(fromBlock: bigint, toBlock: bigint) {
    return viemClient.getContractEvents({
      address: DEPOSIT_CONTRACT,
      abi: DEPOSIT_ABI,
      eventName: "Deposit",
      fromBlock,
      toBlock
    });
  }

  static getWithdrawEvents(fromBlock: bigint, toBlock: bigint) {
    return viemClient.getContractEvents({
      address: DEPOSIT_CONTRACT,
      abi: DEPOSIT_ABI,
      eventName: "WithDrawUser",
      fromBlock,
      toBlock
    });
  }

  static getBalance(address: Address) {
    return viemClient.readContract({
      address: DEPOSIT_CONTRACT,
      abi: DEPOSIT_ABI,
      functionName: "depositorInfo",
      args: [address]
    });
  }

  static async lockWithdraw() {
    await lockerWalletClient.writeContract({
      address: DEPOSIT_CONTRACT,
      abi: DEPOSIT_ABI,
      functionName: "turnOffWithDraw",
      account: locker
    });
  }
}
