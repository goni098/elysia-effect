import Elysia, { t } from "elysia";

import { LaunchpadSnapshotRepository } from "@root/repositories/launchpad-snapshot.repository";
import { VestingPoolRepository } from "@root/repositories/vesting-pool.repository";

export const getProjectSnapshots = new Elysia({
  name: "Handler.Admin.GetProjectSnapshots"
}).get(
  "/projects/:project_id/snapshots",
  async ({ params }) => {
    const { project_id } = params;

    const [snapshots, vestingPool] = await Promise.all([
      LaunchpadSnapshotRepository.findAllByProjectId(project_id),
      VestingPoolRepository.findByProjectId(project_id)
    ]);

    return {
      poolId: vestingPool?.id,
      snapshots
    };
  },
  {
    params: t.Object({
      project_id: t.String({ minLength: 1 })
    })
  }
);
