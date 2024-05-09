import type { Prisma } from "@prisma/client";
import { DateTime } from "luxon";
import type { Address } from "viem";

import type { ChangeProjectStatusPayload } from "@root/modules/admin/parsers/changeProjectStatus";
import type { PaginatedQuery } from "@root/shared/parser";
import { prisma } from "@root/shared/prisma";

export abstract class LaunchpadRepository {
  static findByProjectId(projectId: string) {
    return prisma.launchpad.findUnique({
      where: {
        projectId
      }
    });
  }

  static changeStatus(
    projectId: string,
    { autoInvest, vesting, finished }: ChangeProjectStatusPayload
  ) {
    return prisma.launchpad.update({
      where: {
        projectId
      },
      data: {
        autoInvest,
        vesting,
        finished
      }
    });
  }

  static findAllSnapshotDateReached() {
    return prisma.launchpad.findMany({
      where: {
        snappedDate: null,
        snapshotDate: {
          lte: DateTime.now().toJSDate()
        }
      }
    });
  }

  static updateSnappedDate(projectId: string, snappedDate: DateTime) {
    return prisma.launchpad.update({
      where: {
        projectId
      },
      data: {
        snappedDate: snappedDate.toJSDate()
      }
    });
  }

  static async findAppliedByUser(
    user: Address,
    { page, take }: PaginatedQuery
  ) {
    const filter: Prisma.LaunchpadWhereInput = {
      participants: {
        some: {
          participantAddress: user
        }
      }
    };

    const [launchpads, total] = await Promise.all([
      prisma.launchpad.findMany({
        select: {
          project: {
            select: {
              id: true,
              name: true,
              logo: true
            }
          },
          snapshots: {
            select: {
              tokenReceived: true
            },
            where: {
              user
            }
          }
        },
        where: filter,
        take,
        skip: (page - 1) * take
      }),
      prisma.launchpad.count({
        where: filter
      })
    ]);

    return { launchpads, total };
  }

  static async findInvestedByUser(
    user: Address,
    { page, take }: PaginatedQuery
  ) {
    const filter: Prisma.LaunchpadWhereInput = {
      snapshots: {
        some: {
          user,
          tokenReceived: {
            gt: 0
          }
        }
      }
    };

    const [launchpads, total] = await Promise.all([
      prisma.launchpad.findMany({
        select: {
          project: {
            select: {
              id: true,
              name: true,
              logo: true,
              token: {
                select: {
                  address: true,
                  icon: true,
                  name: true,
                  price: true,
                  symbol: true,
                  totalSupply: true
                }
              }
            }
          },
          snapshots: {
            select: {
              investedAmount: true,
              tokenReceived: true
            },
            where: {
              user,
              tokenReceived: {
                gt: 0
              }
            }
          }
        },
        where: filter,
        take,
        skip: (page - 1) * take
      }),
      prisma.launchpad.count({
        where: filter
      })
    ]);

    return { launchpads, total };
  }
}
