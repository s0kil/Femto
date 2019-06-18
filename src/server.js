import sirv from "sirv";
import polka from "polka";
import compression from "shrink-ray-current";
import * as sapper from "@sapper/server";

import { apiHandler } from "./api";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

function api(request, response, next) {
  if (request.method === "POST" && request.path === "/api") {
    apiHandler(request, response, next);
  } else {
    next();
  }
}

polka()
  .use(
    api,
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, err => {
    if (err) console.log("error", err);
  });
