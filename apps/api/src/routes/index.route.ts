import { Hono } from "hono";
import * as Status from "stoker/http-status-codes";

const routes = new Hono()
  .get("/", function Index(c) {
    return c.json({
      message: "API index",
    }, Status.OK);
  });

export default routes;
export type IndexAppType = typeof routes;
