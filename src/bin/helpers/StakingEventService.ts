import { Decimal } from "@prisma/client/runtime/library";
import { DateTime } from "luxon";
import type { WatchContractEventOnLogsParameter } from "viem";

import type { STAKING_ABI } from "@root/contracts/staking.abi";
import { retrieveErrorMessage } from "@root/helpers/retrieve-error";
import { StakedPoolRepository } from "@root/repositories/stakedPool.repository";
import { TracingRepository } from "@root/repositories/tracing.repository";

export type StakeEvent = WatchContractEventOnLogsParameter<
  typeof STAKING_ABI,
  "Stake"
>[number];

export type UnStakeEvent = WatchContractEventOnLogsParameter<
  typeof STAKING_ABI,
  "UnStake"
>[number];

export abstract class StakingEventService {
  static async handleStakeEvent(event: StakeEvent) {
    const { amount, end, itemId, pPoint, poolType, staker } = event.args;

    const txHash = event.transactionHash;

    try {
      if (!amount || !end || !itemId || !pPoint || !poolType || !staker) {
        throw new Error("Stake missing event arguments");
      }

      await StakedPoolRepository.createPool({
        amount: new Decimal(amount.toString()),
        itemId: itemId.toString(),
        lookup: poolType,
        point: new Decimal(pPoint.toString()),
        staker,
        endTime: DateTime.fromSeconds(parseInt(end.toString()))
      });

      await TracingRepository.createStreamEvent({
        context: "stake",
        payload: {
          staker,
          amount: amount.toString(),
          itemId: itemId.toString(),
          lookup: poolType,
          point: pPoint.toString(),
          endTime: end.toString()
        },
        txHash
      });

      console.log(`done handle event ${event.eventName} ${txHash}`);
    } catch (error) {
      console.log(`Failed to handle stake event`);

      await TracingRepository.createStreamEvent({
        context: "stake",
        payload: {
          staker,
          amount: amount?.toString(),
          itemId: itemId?.toString(),
          lookup: poolType,
          point: pPoint?.toString(),
          endTime: end?.toString()
        },
        txHash,
        isFailure: true,
        errorMessage: retrieveErrorMessage(error)
      });
    }
  }

  static async handleUnStakeEvent(event: UnStakeEvent) {
    const { itemId, lossPoint, unStakeAmount } = event.args;
    const txHash = event.transactionHash;

    try {
      if (!itemId || !lossPoint || !unStakeAmount) {
        throw new Error("Unstake missing event arguments");
      }

      await StakedPoolRepository.unStakePool({
        unStakedAmount: new Decimal(unStakeAmount.toString()),
        itemId: itemId.toString(),
        lostPoint: new Decimal(lossPoint.toString())
      });

      await TracingRepository.createStreamEvent({
        context: "unstake",
        payload: {
          unStakedAmount: unStakeAmount.toString(),
          itemId: itemId.toString(),
          lostPoint: lossPoint.toString()
        },
        txHash
      });

      console.log(`done handle event ${event.eventName} ${txHash}`);
    } catch (error) {
      console.log(`Failed to handle unstake event`);

      await TracingRepository.createStreamEvent({
        context: "unstake",
        payload: {
          unStakedAmount: unStakeAmount?.toString(),
          itemId: itemId?.toString(),
          lostPoint: lossPoint?.toString()
        },
        txHash,
        isFailure: true,
        errorMessage: retrieveErrorMessage(error)
      });
    }
  }
}
