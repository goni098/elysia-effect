import Elysia from "elysia";

import { applyLaunchpad } from "./apply-launchpad";
import { getProject } from "./get-project";
import { getProjects } from "./get-projects";
import { getUserLaunchpadStatus } from "./get-user-launchpad-status";
import { submitIdo } from "./submit-ido";

export const project = new Elysia({
  name: "Controller.Project",
  prefix: "projects",
  detail: {
    tags: ["Project"]
  }
})
  .use(applyLaunchpad)
  .use(getProject)
  .use(getProjects)
  .use(getUserLaunchpadStatus)
  .use(submitIdo);
