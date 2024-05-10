import type { Launchpad } from "@prisma/client";
import { DateTime } from "luxon";

export const retrieveLaunchStatus = ({
  snapshotDate,
  startDate,
  autoInvest,
  snappedDate,
  vesting
}: Pick<
  Launchpad,
  "startDate" | "snapshotDate" | "autoInvest" | "vesting" | "snappedDate"
>): Status => {
  const currentTime = DateTime.now().toJSDate();

  if (startDate > currentTime) {
    return "un_start";
  }

  if (startDate <= currentTime && currentTime < snapshotDate) {
    return "application";
  }

  if (!snappedDate) {
    return "snapping";
  }

  if (vesting) {
    return "vesting";
  }

  if (autoInvest) {
    return "auto_invest";
  }

  return "snapped";
};

type Status =
  | "un_start"
  | "application"
  | "snapping"
  | "snapped"
  | "auto_invest"
  | "vesting";
