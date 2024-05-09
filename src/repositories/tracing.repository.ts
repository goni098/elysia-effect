import type { Prisma, StreamContext } from "@prisma/client";

import { prisma } from "@root/shared/prisma";

type CreateStreamEventParams = {
  context: StreamContext;
  txHash: string;
  payload: NonNullable<Prisma.JsonValue>;
  errorMessage?: string;
  isFailure?: boolean;
};

export abstract class TracingRepository {
  static createStreamEvent({
    context,
    payload,
    txHash,
    errorMessage,
    isFailure
  }: CreateStreamEventParams) {
    return prisma.streamEvent.create({
      data: {
        context,
        payload,
        txHash,
        errorMessage,
        isFailure
      }
    });
  }

  static findStreamEventByTxHash(txHash: string) {
    return prisma.streamEvent.findFirst({
      where: {
        txHash
      }
    });
  }
}
