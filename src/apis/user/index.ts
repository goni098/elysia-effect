import Elysia from "elysia";

import { getInvestmentAccount } from "./get-investment-account";
import { getLaunchpadApplications } from "./get-launchpad-applications";
import { getLaunchpadClaimHistories } from "./get-launchpad-claim-hisotires";
import { getLaunchpadInvestments } from "./get-launchpad-investments";
import { getLaunchpadVestingPeriod } from "./get-launchpad-vesting-period";
import { getMessage } from "./get-message";
import { getPools } from "./get-pools";
import { getPoolsStatistics } from "./get-pools-statistics";
import { login } from "./login";
import { me } from "./me";
import { renew } from "./renew";

export const user = new Elysia({
  name: "Controller.User",
  prefix: "users",
  detail: {
    tags: ["User"]
  }
})
  .use(getInvestmentAccount)
  .use(getLaunchpadApplications)
  .use(getLaunchpadClaimHistories)
  .use(getLaunchpadInvestments)
  .use(getLaunchpadVestingPeriod)
  .use(getMessage)
  .use(getPoolsStatistics)
  .use(getPools)
  .use(login)
  .use(me)
  .use(renew);
