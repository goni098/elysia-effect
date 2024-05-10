import { consumeEffect } from "@root/helpers/consume-effect";
import { LaunchpadSnapshotRepository } from "@root/repositories/launchpad-snapshot.repository";
import { VestingPoolRepository } from "@root/repositories/vesting-pool.repository";
import { Effect, pipe } from "effect";
import Elysia, { t } from "elysia";

export const getProjectSnapshots = new Elysia({
  name: "Handler.Admin.GetProjectSnapshots"
}).get(
  "/projects/:project_id/snapshots",
  ({ params }) =>
    pipe(
      [
        LaunchpadSnapshotRepository.findAllByProjectId(params.project_id),
        VestingPoolRepository.findByProjectId(params.project_id)
      ] as const,
      Effect.all,
      Effect.map(([snapshots, vestingPool]) => ({
        poolId: vestingPool?.id,
        snapshots
      })),
      consumeEffect
    ),
  {
    params: t.Object({
      project_id: t.String({ minLength: 1 })
    })
  }
);
