import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const logFeatureFlag = process.env.LOG_QUERY;

const log: Prisma.LogLevel[] = ["error", "warn", "info"];

if (logFeatureFlag) {
  log.push("query");
}

const prismaClient = new PrismaClient<Prisma.PrismaClientOptions, "query">({
  log,
  errorFormat: "pretty"
});

if (logFeatureFlag) {
  prismaClient.$on("query", e => {
    console.log("Params: " + e.params);
  });
}

await prismaClient.$connect();

console.log("connected to database");

export const prisma = prismaClient;
