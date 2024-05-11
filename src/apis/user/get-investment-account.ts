import Elysia from "elysia";

import { authPlugin } from "@root/plugins/auth.plugin";
import { DepositContractService } from "@root/services/contracts/DepositContractService";

export const getInvestmentAccount = new Elysia({
  name: "Handler.User.GetInvestmentAccount"
})
  .use(authPlugin())
  .get("/investment-account", async ({ claims }) => {
    const { address } = claims;
    const balance = await DepositContractService.getBalance(address);

    return {
      address,
      balance: balance.toString()
    };
  });
