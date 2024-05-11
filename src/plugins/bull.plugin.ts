import Queue from "bull";
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

  queue.process(job, async (job, done) => {
    try {
      await consumer(job);
      done();
    } catch (error) {
      done(intoError(error));
    }
  });

  return new Elysia({
    name: "Plugin.Queue",
    seed: name
  }).decorate({
    queue,
    job
  });
};
