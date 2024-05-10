import type { Prisma } from "@prisma/client";
import { DateTime } from "luxon";

import { prisma } from "@root/shared/prisma";
import { GetProjectsParams } from "@root/apis/admin/get-projects";
import { Effect } from "effect";
import { DatabaseError } from "@root/errors";
import { CreateProjectPayload } from "@root/apis/admin/create-project";
import { UpdateProjectPayload } from "@root/apis/admin/update-project";

export abstract class ProjectRepository {
  static findById(id: string) {
    return Effect.tryPromise({
      catch: error => new DatabaseError(error),
      try: () =>
        prisma.project.findUnique({
          where: { id },
          include: {
            launchpad: true,
            launchpool: true,
            token: true
          }
        })
    });
  }

  static create(payload: CreateProjectPayload) {
    return Effect.tryPromise({
      catch: error => new DatabaseError(error),
      try: () => {
        const {
          banner,
          description,
          launchpad,
          launchpool,
          logo,
          name,
          shortDescription,
          socials,
          tags,
          token,
          marketMaker
        } = payload;

        const {
          cliffTime,
          linearTime,
          percents,
          snapshotDate,
          startDate,
          tge,
          times,
          vestingDate,
          vestingType,
          autoInvestDate,
          ticketSize,
          tokenOffer,
          tokenPrice,
          totalRaise,
          unlockPercent
        } = launchpad;

        const {
          address,
          icon,
          name: tokenName,
          price,
          symbol,
          totalSupply
        } = token;

        return prisma.project.create({
          data: {
            banner,
            marketMaker,
            description,
            logo,
            metadata: {},
            name,
            shortDescription,
            socials,
            tags,
            token: {
              create: {
                name: tokenName,
                address,
                icon,
                price: price.toString(),
                symbol,
                totalSupply
              }
            },
            launchpad: {
              create: {
                cliffTime: cliffTime.toString(),
                linearTime: linearTime.toString(),
                snapshotDate: snapshotDate,
                startDate: startDate,
                tge: tge.toString(),
                unlockPercent,
                vestingType: vestingType,
                percents: percents,
                times: times.map(String),
                vestingDate: vestingDate,
                autoInvestDate,
                ticketSize: ticketSize.toString(),
                tokenOffer: tokenOffer.toString(),
                tokenPrice: tokenPrice.toString(),
                totalRaise: totalRaise.toString()
              }
            },

            launchpool: launchpool
              ? {
                  create: {
                    cliffTime: launchpool.cliffTime.toString(),
                    linearTime: launchpool.cliffTime.toString(),
                    snapshotDate: launchpool.snapshotDate,
                    startDate: launchpool.startDate,
                    tge: launchpool.tge.toString(),
                    unlockPercent: launchpool.unlockPercent,
                    vestingType: launchpool.vestingType,
                    times: launchpool.times.map(String),
                    percents: launchpool.percents,
                    autoInvestDate: launchpool.autoInvestDate,
                    tokenReward: launchpool.tokenReward.toString(),
                    totalAirdrop: launchpool.totalAirdrop.toString(),
                    vestingDate: launchpool.vestingDate
                  }
                }
              : undefined
          }
        });
      }
    });
  }

  static find({ page, take, status }: GetProjectsParams) {
    return Effect.tryPromise({
      catch: error => new DatabaseError(error),
      try: () => {
        const filter: Prisma.ProjectWhereInput = {};
        const currentTime = DateTime.now().toJSDate();

        switch (status) {
          case "ended":
            filter.launchpad = {
              vestingDate: {
                lt: currentTime
              }
            };
            break;

          case "ongoing":
            filter.launchpad = {
              startDate: {
                lt: currentTime
              },
              vestingDate: {
                gt: currentTime
              }
            };
            break;

          case "upcoming":
            filter.launchpad = {
              startDate: {
                gt: currentTime
              }
            };
            break;

          default:
            break;
        }

        return Promise.all([
          prisma.project.findMany({
            include: {
              launchpad: true,
              launchpool: true,
              token: true
            },
            where: filter,
            take,
            skip: (page - 1) * take
          }),
          prisma.project.count({ where: filter })
        ]);
      }
    });
  }

  static update(projectId: string, payload: UpdateProjectPayload) {
    return Effect.tryPromise({
      catch: error => new DatabaseError(error),
      try: async () => {
        const {
          banner,
          description,
          logo,
          name,
          shortDescription,
          socials,
          tags,
          token,
          launchpad,
          launchpool
        } = payload;

        const project = await prisma.project.findUnique({
          where: { id: projectId },
          select: { socials: true }
        });

        if (!project) {
          return;
        }

        const newSocials = {
          ...Object(project.socials),
          ...socials
        };

        return prisma.project.update({
          where: {
            id: projectId
          },
          data: {
            banner,
            description,
            name,
            shortDescription,
            socials: newSocials,
            tags,
            logo,
            token: {
              update: {
                address: token?.address,
                icon: token?.icon,
                name: token?.name,
                price: token?.price?.toString(),
                symbol: token?.symbol,
                totalSupply: token?.totalSupply
              }
            },
            launchpad: {
              update: {
                cliffTime: launchpad?.cliffTime?.toString(),
                linearTime: launchpad?.linearTime?.toString(),
                snapshotDate: launchpad?.snapshotDate,
                startDate: launchpad?.startDate,
                tge: launchpad?.tge?.toString(),
                unlockPercent: launchpad?.unlockPercent,
                vestingType: launchpad?.vestingType,
                percents: launchpad?.percents,
                times: launchpad?.times?.map(String),
                vestingDate: launchpad?.vestingDate,
                autoInvestDate: launchpad?.autoInvestDate,
                ticketSize: launchpad?.ticketSize?.toString(),
                tokenOffer: launchpad?.tokenOffer?.toString(),
                tokenPrice: launchpad?.tokenPrice?.toString(),
                totalRaise: launchpad?.totalRaise?.toString()
              }
            },
            launchpool: {
              update: {
                cliffTime: launchpool?.cliffTime?.toString(),
                linearTime: launchpool?.cliffTime?.toString(),
                snapshotDate: launchpool?.snapshotDate,
                startDate: launchpool?.startDate,
                tge: launchpool?.tge?.toString(),
                unlockPercent: launchpool?.unlockPercent,
                vestingType: launchpool?.vestingType,
                times: launchpool?.times?.map(String),
                percents: launchpool?.percents,
                autoInvestDate: launchpool?.autoInvestDate,
                tokenReward: launchpool?.tokenReward?.toString(),
                totalAirdrop: launchpool?.totalAirdrop?.toString(),
                vestingDate: launchpool?.vestingDate?.toString()
              }
            }
          }
        });
      }
    });
  }
}
