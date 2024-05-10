import Elysia from "elysia";

import { ENDPOINT } from "@root/shared/constant";

import { me } from "./user/me";
import { changeProjectStatus } from "./admin/change-project-status";
import { createProject } from "./admin/create-project";
import { getIdoForms } from "./admin/get-ido-forms";
import { getProjectSnapshots } from "./admin/get-project-snapshots";
import { updateProject } from "./admin/update-project";
import { authPlugin } from "@root/plugins/auth.plugin";
import { adminAuthPlugin } from "@root/plugins/admin-auth.plugin";

export const user = new Elysia({
  name: "Controller.User",
  prefix: ENDPOINT.USER.PREFIX,
  detail: {
    tags: ["User"]
  }
}).use(me);

export const project = new Elysia({
  name: "Controller.Project",
  prefix: ENDPOINT.AUTH.PREFIX,
  detail: {
    tags: ["Auth"]
  }
});

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
  .use(updateProject);

export const kyc = new Elysia({ name: "Controller.Kyc" });

export const general = new Elysia({ name: "Controller.General" });
