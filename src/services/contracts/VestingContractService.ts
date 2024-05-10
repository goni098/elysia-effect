import { VESTING_ABI } from "@root/contracts/vesting.abi";
import { VESTING_CONTRACT } from "@root/shared/env";
import { viemClient } from "@root/shared/viem";

export abstract class VestingContractService {
  static getCreatePoolEvents(fromBlock: bigint, toBlock: bigint) {
    return viemClient.getContractEvents({
      address: VESTING_CONTRACT,
      abi: VESTING_ABI,
      eventName: "CreatePoolEvent",
      fromBlock,
      toBlock
    });
  }

  static getClaimEvents(fromBlock: bigint, toBlock: bigint) {
    return viemClient.getContractEvents({
      address: VESTING_CONTRACT,
      abi: VESTING_ABI,
      eventName: "ClaimFundEvent",
      fromBlock,
      toBlock
    });
  }
}
