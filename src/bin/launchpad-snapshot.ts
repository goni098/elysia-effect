import { DateTime } from "luxon";
import { parseEther } from "viem";

import { LaunchpadParticipantRepository } from "@root/repositories/launchpad-participant.repository";
import { LaunchpadSnapshotRepository } from "@root/repositories/launchpad-snapshot.repository";
import { LaunchpadRepository } from "@root/repositories/launchpad.repository";
import { DepositContractService } from "@root/services/contracts/DepositContractService";
import { sleep } from "@root/utils/sleep";

async function run() {
  while (true) {
    const launchpads = await LaunchpadRepository.findAllSnapshotDateReached();

    console.log("launchpads: ", launchpads.length);

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

await run();
