import type { Address } from "viem";

import { STAKING_CONTRACT } from "@root/shared/env";
import { viemClient } from "@root/shared/viem";
import { STAKING_ABI } from "@root/contracts/staking.abi";
import { Effect } from "effect";
import { ViemError } from "@root/errors/ViemError";

export abstract class StakingContractService {
  static getPendingReward(poolId: bigint) {
    return viemClient.readContract({
      abi: STAKING_ABI,
      address: STAKING_CONTRACT,
      functionName: "getPendingReward",
      args: [poolId]
    });
  }

  static getUserStakedInfo(user: Address) {
    return Effect.tryPromise({
      catch: error => new ViemError(error),
      try: () =>
        viemClient.readContract({
          abi: STAKING_ABI,
          address: STAKING_CONTRACT,
          functionName: "getUserTotalStaked",
          args: [user]
        })
    }).pipe(
      Effect.map(([totalStaked, totalPoint, totalReward, balance]) => ({
        totalStaked,
        totalPoint,
        totalReward,
        balance
      }))
    );
  }

  static async getTotalStakedPool() {
    const [totalStaked, totalNumberStaker, totalReward, avgAPY] =
      await viemClient.readContract({
        abi: STAKING_ABI,
        address: STAKING_CONTRACT,
        functionName: "getTotalStakedPool"
      });

    return {
      totalStaked,
      totalNumberStaker,
      totalReward,
      avgAPY
    };
  }

  static getStakeEvent(
    fromBlock: bigint,
    toBlock: bigint,
    event: "Stake" | "UnStake"
  ) {
    return viemClient.getContractEvents({
      address: STAKING_CONTRACT,
      abi: STAKING_ABI,
      eventName: event,
      fromBlock,
      toBlock
    });
  }
}
