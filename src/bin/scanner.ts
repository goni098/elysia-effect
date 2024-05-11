import { SettingRepository } from "@root/repositories/setting.repository";
import { TracingRepository } from "@root/repositories/tracing.repository";
import { CONTRACT_EVENTS_SIGNATURE } from "@root/shared/constant";
import {
  DEPOSIT_CONTRACT,
  STAKING_CONTRACT,
  VESTING_CONTRACT
} from "@root/shared/env";
import { viemClient } from "@root/shared/viem";
import { sleep } from "@root/utils/sleep";

import type { DepositEvent } from "../services/contracts/DepositContractService";
import type { WithdrawEvent } from "./helpers/InvestmentEventService";
import { InvestmentEventService } from "./helpers/InvestmentEventService";
import type { StakeEvent, UnStakeEvent } from "./helpers/StakingEventService";
import { StakingEventService } from "./helpers/StakingEventService";
import type {
  ClaimFundEvent,
  CreateVestingPoolEvent
} from "./helpers/VestingEventService";
import { VestingEventService } from "./helpers/VestingEventService";

async function run() {
  const scannedBlock = await SettingRepository.get("scanned_block");
  let blockNumber: bigint;

  if (!scannedBlock) {
    const latestBlock = await viemClient.getBlock();

    await SettingRepository.insert(
      "scanned_block",
      latestBlock.number.toString()
    );

    blockNumber = latestBlock.number;
  } else {
    blockNumber = BigInt(scannedBlock);
  }

  while (true) {
    try {
      blockNumber = await scan(blockNumber);
      await sleep(10_000);
    } catch (error) {
      console.error(`Failed to handle block: ${blockNumber.toString()}`);
      console.error(error);
    }
  }
}

async function scan(blockNumber: bigint) {
  const latestBlock = await viemClient.getBlock();

  if (latestBlock.number <= blockNumber) {
    return blockNumber;
  }

  console.log("latestBlock: ", latestBlock.number);

  const events = await viemClient.getLogs({
    address: [DEPOSIT_CONTRACT, STAKING_CONTRACT, VESTING_CONTRACT],
    events: CONTRACT_EVENTS_SIGNATURE,
    fromBlock: blockNumber,
    toBlock: latestBlock.number
  });

  const tasks: Array<Promise<void>> = [];

  events.forEach(event => {
    switch (event.eventName) {
      case "Deposit":
        tasks.push(handleMissingDepositEvent(event));
        break;

      case "WithDrawUser":
        tasks.push(handleMissingWithdrawEvent(event));
        break;

      case "Stake":
        tasks.push(handleMissingStakeEvent(event));
        break;

      case "UnStake":
        tasks.push(handleMissingUnStakeEvent(event));
        break;

      case "CreatePoolEvent":
        tasks.push(handleMissingCreatePoolEvent(event));
        break;

      case "ClaimFundEvent":
        tasks.push(handleMissingClaimEvent(event));
        break;

      default:
        break;
    }
  });

  await Promise.all(tasks);

  await SettingRepository.set("scanned_block", latestBlock.number.toString());

  return latestBlock.number + BigInt(1);
}

async function handleMissingDepositEvent(event: DepositEvent) {
  const handledEvent = await TracingRepository.findStreamEventByTxHash(
    event.transactionHash
  );

  if (handledEvent) {
    return;
  }

  await InvestmentEventService.handleDepositEvent(event);
}

async function handleMissingWithdrawEvent(event: WithdrawEvent) {
  const handledEvent = await TracingRepository.findStreamEventByTxHash(
    event.transactionHash
  );

  if (handledEvent) {
    return;
  }

  await InvestmentEventService.handleWithdrawEvent(event);
}

async function handleMissingStakeEvent(event: StakeEvent) {
  const handledEvent = await TracingRepository.findStreamEventByTxHash(
    event.transactionHash
  );

  if (handledEvent) {
    return;
  }

  await StakingEventService.handleStakeEvent(event);
}

async function handleMissingUnStakeEvent(event: UnStakeEvent) {
  const handledEvent = await TracingRepository.findStreamEventByTxHash(
    event.transactionHash
  );

  if (handledEvent) {
    return;
  }

  await StakingEventService.handleUnStakeEvent(event);
}

async function handleMissingCreatePoolEvent(event: CreateVestingPoolEvent) {
  const handledEvent = await TracingRepository.findStreamEventByTxHash(
    event.transactionHash
  );

  if (handledEvent) {
    return;
  }

  await VestingEventService.handleCreatePoolEvent(event);
}

async function handleMissingClaimEvent(event: ClaimFundEvent) {
  const handledEvent = await TracingRepository.findStreamEventByTxHash(
    event.transactionHash
  );

  if (handledEvent) {
    return;
  }

  await VestingEventService.handleClaimEvent(event);
}

await run();
