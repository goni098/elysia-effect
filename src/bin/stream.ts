import { CONTRACT_EVENTS_SIGNATURE } from "@root/shared/constant";
import {
  DEPOSIT_CONTRACT,
  STAKING_CONTRACT,
  VESTING_CONTRACT
} from "@root/shared/env";
import { viemClient } from "@root/shared/viem";

import { InvestmentEventService } from "./helpers/InvestmentEventService";
import { StakingEventService } from "./helpers/StakingEventService";
import { VestingEventService } from "./helpers/VestingEventService";

function run() {
  viemClient.watchEvent({
    address: [DEPOSIT_CONTRACT, STAKING_CONTRACT, VESTING_CONTRACT],
    events: CONTRACT_EVENTS_SIGNATURE,
    onLogs: async logs => {
      try {
        const tasks: Array<Promise<void>> = [];

        logs.forEach(event => {
          switch (event.eventName) {
            case "Deposit":
              tasks.push(InvestmentEventService.handleDepositEvent(event));
              break;

            case "WithDrawUser":
              tasks.push(InvestmentEventService.handleWithdrawEvent(event));
              break;

            case "Stake":
              tasks.push(StakingEventService.handleStakeEvent(event));
              break;

            case "UnStake":
              tasks.push(StakingEventService.handleUnStakeEvent(event));
              break;

            case "CreatePoolEvent":
              tasks.push(VestingEventService.handleCreatePoolEvent(event));
              break;

            case "ClaimFundEvent":
              tasks.push(VestingEventService.handleClaimEvent(event));
              break;

            default:
              break;
          }
        });
        await Promise.all(tasks);
      } catch (error) {
        console.error("unexpected error on stream");
        console.error(error);
      }
    }
  });

  console.log("stream is running on: ", {
    deposit: DEPOSIT_CONTRACT,
    staking: STAKING_CONTRACT,
    vesting: VESTING_CONTRACT
  });

  return Promise.resolve(void 0);
}

await run();
