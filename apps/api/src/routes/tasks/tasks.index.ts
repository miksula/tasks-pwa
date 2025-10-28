import { Hono } from "hono";
import { create, getOne, list, remove, update } from "./tasks.handlers.ts";

const routes = new Hono()
  .get("/", ...list)
  .post("/", ...create)
  .get("/:id", ...getOne)
  .patch("/:id", ...update)
  .delete("/:id", ...remove);

export default routes;
export type TasksAppType = typeof routes;
