import { prisma } from "@root/shared/prisma";

type Key = "scanned_block";

export abstract class SettingRepository {
  static async get(key: Key) {
    const setting = await prisma.setting.findUnique({ where: { key } });
    return setting?.value;
  }

  static insert(key: Key, value: string) {
    return prisma.setting.create({
      data: {
        key,
        value
      }
    });
  }

  static set(key: Key, value: string) {
    return prisma.setting.update({
      data: {
        value
      },
      where: {
        key
      }
    });
  }
}
