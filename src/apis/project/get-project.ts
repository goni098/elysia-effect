import { HttpError } from "@root/errors";
import { authPlugin } from "@root/plugins/auth.plugin";
import { LaunchpadParticipantRepository } from "@root/repositories/launchpad-participant.repository";
import { LaunchpoolParticipantRepository } from "@root/repositories/launchpool-participant.repository";
import { ProjectRepository } from "@root/repositories/project.repository";
import { Effect, pipe } from "effect";
import Elysia, { t } from "elysia";

export const getProject = new Elysia({
  name: "Handler.Project.GetProject"
})
  .use(authPlugin("optional"))
  .get(
    "/:project_id",
    ({ claims, params }) =>
      pipe(
        ProjectRepository.findById(params.project_id),
        Effect.andThen(project => {
          if (!project || !project.launchpad) {
            return HttpError.FromUnauthorized("Project not found");
          }

          return Effect.succeed(project);
        }),
        Effect.bindTo("project"),
        Effect.bind("poolInfo", () =>
          pipe(
            {
              totalLaunchpadParticipants:
                LaunchpadParticipantRepository.countParticipant(
                  params.project_id
                ),
              totalLaunchpoolParticipants:
                LaunchpoolParticipantRepository.countParticipant(
                  params.project_id
                )
            },
            Effect.all
          )
        ),
        Effect.bind("userPoolInfo", () => {
          if (claims.address) {
            return Effect.Do;
          }

          return pipe(
            [
              LaunchpadParticipantRepository.findByUserAddressAndProjectId(
                claims.address,
                params.project_id
              ),
              LaunchpoolParticipantRepository.findByUserAddressAndProjectId(
                claims.address,
                params.project_id
              )
            ] as const,
            Effect.all,
            Effect.map(([isJoinedLaunchpad, isJoinedLaunchpool]) => ({
              launchpadUser: {
                address: claims.address,
                joined: !!isJoinedLaunchpad
              },
              launchpoolUser: {
                address: claims.address,
                bnbConnected: 0,
                reward: 0,
                joined: !!isJoinedLaunchpool
              }
            }))
          );
        })
      ),
    {
      params: t.Object({
        project_id: t.String({ minLength: 1 })
      })
    }
  );
