import { VestingType } from "@prisma/client";

export const vestingTypeMapping = (type: number) => {
  switch (type) {
    case 0:
      return VestingType.VESTING_TYPE_LINEAR_CLIFF_FIRST;

    case 1:
      return VestingType.VESTING_TYPE_LINEAR_UNLOCK_FIRST;

    case 2:
      return VestingType.VESTING_TYPE_MILESTONE_CLIFF_FIRST;

    case 3:
      return VestingType.VESTING_TYPE_MILESTONE_UNLOCK_FIRST;

    default:
      return VestingType.VESTING_TYPE_LINEAR_CLIFF_FIRST;
  }
};
