import { KycStatus } from "@prisma/client";
import { Map } from "immutable";

import { DEPOSIT_ABI } from "@root/contracts/deposit.abi";
import { STAKING_ABI } from "@root/contracts/staking.abi";
import { VESTING_ABI } from "@root/contracts/vesting.abi";

export const ACCESS_TOKEN_EXPIRED_DURATION = "3d";

export const REFRESH_TOKEN_EXPIRED_DURATION = "1y";

export const VERIFF_KYC_STATUS_BY_VERIFF_CODE: Map<number, KycStatus> = Map<
  number,
  KycStatus
>()
  .set(7001, KycStatus.STARTED)
  .set(7002, KycStatus.SUBMITTED)
  .set(9001, KycStatus.APPROVED)
  .set(9102, KycStatus.DECLINED)
  .set(9103, KycStatus.RESUBMISSION_REQUESTED)
  .set(9104, KycStatus.EXPIRED)
  .set(9121, KycStatus.REVIEW);

export const CONTRACT_EVENTS_SIGNATURE = [
  ...DEPOSIT_ABI.filter(
    e =>
      e.type === "event" && (e.name === "Deposit" || e.name === "WithDrawUser")
  ),
  ...STAKING_ABI.filter(
    e => e.type === "event" && (e.name === "Stake" || e.name === "UnStake")
  ),
  ...VESTING_ABI.filter(
    e =>
      e.type === "event" &&
      (e.name === "CreatePoolEvent" || e.name === "ClaimFundEvent")
  )
] as const;
