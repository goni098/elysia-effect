import { DateTime } from "luxon";
import type { WatchContractEventOnLogsParameter } from "viem";

import type { VESTING_ABI } from "@root/contracts/vesting.abi";
import { retrieveErrorMessage } from "@root/helpers/retrieve-error";
import { TracingRepository } from "@root/repositories/tracing.repository";
import { TransactionRepository } from "@root/repositories/transaction.repository";
import { VestingPoolRepository } from "@root/repositories/vestingPool.repository";

export type CreateVestingPoolEvent = WatchContractEventOnLogsParameter<
  typeof VESTING_ABI,
  "CreatePoolEvent"
>[number];

export type ClaimFundEvent = WatchContractEventOnLogsParameter<
  typeof VESTING_ABI,
  "ClaimFundEvent"
>[number];

export abstract class VestingEventService {
  static async handleCreatePoolEvent(event: CreateVestingPoolEvent) {
    const { pool } = event.args;

    const txHash = event.transactionHash;

    try {
      if (!pool?.id || !pool.projectId) {
        throw new Error("CreatePool missing event arguments");
      }

      const { id, projectId } = pool;

      await VestingPoolRepository.create(id.toString(), projectId);

      await TracingRepository.createStreamEvent({
        context: "create_vesting_pool",
        payload: {
          id: id.toString(),
          projectId
        },
        txHash
      });

      console.log(`done handle event ${event.eventName} ${txHash}`);
    } catch (error) {
      console.log(`Failed to handle create vesting pool event`);

      await TracingRepository.createStreamEvent({
        context: "create_vesting_pool",
        payload: {
          id: pool?.id?.toString(),
          projectId: pool?.projectId
        },
        txHash,
        isFailure: true,
        errorMessage: retrieveErrorMessage(error)
      });
    }
  }

  static async handleClaimEvent(event: ClaimFundEvent) {
    const { fundClaimed, poolId, user } = event.args;
    const txHash = event.transactionHash;

    try {
      if (!fundClaimed || !poolId || !user) {
        throw new Error("ClaimEvent missing event arguments");
      }

      const vestingPool = await VestingPoolRepository.findByPoolId(
        poolId.toString()
      );

      if (!vestingPool) {
        throw new Error(`Not found vesting pool with id: ${poolId.toString()}`);
      }

      await TransactionRepository.createClaimFundTx({
        address: user,
        amount: fundClaimed.toString(),
        date: DateTime.now(),
        projectId: vestingPool.projectId,
        txHash
      });

      await TracingRepository.createStreamEvent({
        context: "claim_fund",
        payload: {
          fundClaimed: fundClaimed.toString(),
          poolId: poolId.toString(),
          user: user.toString()
        },
        txHash
      });

      console.log(`done handle event ${event.eventName} ${txHash}`);
    } catch (error) {
      console.log(`Failed to handle claim fund event`);

      await TracingRepository.createStreamEvent({
        context: "claim_fund",
        payload: {
          fundClaimed: fundClaimed?.toString(),
          poolId: poolId?.toString(),
          user: user?.toString()
        },
        txHash,
        isFailure: true,
        errorMessage: retrieveErrorMessage(error)
      });
    }
  }
}
