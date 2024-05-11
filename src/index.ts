import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { admin } from "./apis/admin";
import { general } from "./apis/general";
import { kyc } from "./apis/kyc";
import { project } from "./apis/project";
import { user } from "./apis/user";
import { errorPlugin } from "./plugins/error.plugin";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Purr APIs documentation",
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
  .use(kyc)
  .use(errorPlugin)
  .listen(8080);

console.log(
  `🦊 Purr is running at ${app.server?.hostname}:${app.server?.port}`
);
