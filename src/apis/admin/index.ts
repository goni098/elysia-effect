import Elysia from "elysia";

import { adminAuthPlugin } from "@root/plugins/admin-auth.plugin";

import { changeProjectStatus } from "./change-project-status";
import { createProject } from "./create-project";
import { getIdoForms } from "./get-ido-forms";
import { getProjectSnapshots } from "./get-project-snapshots";
import { getProjects } from "./get-projects";
import { updateProject } from "./update-project";

export const admin = new Elysia({
  name: "Controller.Admin",
  prefix: "admin",
  detail: {
    tags: ["Admin"]
  }
})
  .use(adminAuthPlugin)
  .use(changeProjectStatus)
  .use(createProject)
  .use(getIdoForms)
  .use(getProjectSnapshots)
  .use(getProjects)
  .use(updateProject);
