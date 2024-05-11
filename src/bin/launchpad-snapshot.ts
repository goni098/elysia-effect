import { DateTime } from "luxon";
import { parseEther } from "viem";

import { LaunchpadRepository } from "@root/repositories/launchpad.repository";
import { LaunchpadParticipantRepository } from "@root/repositories/launchpadParticipant.repository";
import { LaunchpadSnapshotRepository } from "@root/repositories/launchpadSnapshot.repository";
import { DepositContractService } from "@root/services/contracts/DepositContractService";
import { sleep } from "@root/utils/sleep";

async function run() {
  while (true) {
    const launchpads = await LaunchpadRepository.findAllSnapshotDateReached();

    if (!launchpads.length) {
      await sleep(3000);
      continue;
    }

    await DepositContractService.lockWithdraw();

    for (const launchpad of launchpads) {
      const participants =
        await LaunchpadParticipantRepository.findAllByProjectId(
          launchpad.projectId
        );

      for (const participant of participants) {
        const randomInvestedAmount = parseEther(
          (Math.random() * 100).toFixed()
        );
        const randomTokenReceived = parseEther((Math.random() * 100).toFixed());

        await LaunchpadSnapshotRepository.create({
          projectId: launchpad.projectId,
          user: participant.participantAddress,
          investedAmount: randomInvestedAmount,
          tokenReceived: randomTokenReceived
        });
      }

      await LaunchpadRepository.updateSnappedDate(
        launchpad.projectId,
        DateTime.now()
      );
    }

    await sleep(3000);
  }
}

run();
