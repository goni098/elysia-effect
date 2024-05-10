import Queue from "bull";
import { Effect, Either, pipe } from "effect";
import Elysia from "elysia";

import { intoError } from "@root/utils/into-error";

type Queues = Readonly<{
  email: ["send_r_mail", "send_t_mail"];
  notification: ["send_r_notification", "send_t_notification"];
}>;

type QueueConfig<Q extends keyof Queues> = {
  name: Q;
  job: Queues[Q][number];
  consumer: (args: Queue.Job<NonNullable<unknown>>) => Promise<void>;
  opts?: Queue.QueueOptions;
};

export const bullPlugin = <T extends keyof Queues>({
  name,
  job,
  consumer,
  opts
}: QueueConfig<T>) => {
  const queue = new Queue(name, opts);

  queue.process(job, async (job, done) =>
    pipe(
      Effect.tryPromise({
        catch: intoError,
        try: () => consumer(job)
      }),
      Effect.as(undefined),
      Effect.either,
      Effect.runPromise
    ).then(
      Either.match({
        onLeft: done,
        onRight: done
      })
    )
  );

  return new Elysia({
    name: "Plugin.Queue",
    seed: name
  }).decorate({
    queue,
    job
  });
};
