import Elysia from "elysia";

import { ENDPOINT } from "@root/shared/constant";

import { me } from "./user/me";

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

export const admin = new Elysia({ name: "Controller.Admin" });

export const kyc = new Elysia({ name: "Controller.Kyc" });

export const general = new Elysia({ name: "Controller.General" });
