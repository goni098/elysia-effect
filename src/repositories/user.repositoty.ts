import type { Address } from "viem";

import { prisma } from "@root/shared/prisma";

export abstract class UserRepository {
  static findByAddress(address: string) {
    return prisma.user.findUnique({
      where: {
        address
      }
    });
  }

  static createIfNotExist(address: Address) {
    return prisma.user.upsert({
      create: {
        address
      },
      update: {},
      where: {
        address
      }
    });
  }

  static updateEmail(address: Address, email: string) {
    return prisma.user.update({
      data: {
        email
      },
      where: {
        address
      }
    });
  }
}
