import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { errorPlugin } from "./plugins/error.plugin";
import { admin, general, project, user } from "./apis";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Moonkit APIs documentation",
          version: "1.0.50"
        }
      },
      scalarConfig: {
        layout: "modern",
        metaData: {}
      }
    })
  )
  .use(general)
  .use(admin)
  .use(user)
  .use(project)
  .use(errorPlugin)
  .listen(8080);

console.log(
  `🦊 Moonkit is running at ${app.server?.hostname}:${app.server?.port}`
);
