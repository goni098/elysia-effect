import Elysia from "elysia";

import { getStakingPool } from "./get-staking-pool";

export const general = new Elysia({
  name: "Controller.General",
  prefix: "general",
  detail: {
    tags: ["General"]
  }
}).use(getStakingPool);
