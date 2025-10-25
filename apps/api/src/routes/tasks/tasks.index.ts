import createApp from "../../lib/create-app.ts";
import { create, getOne, list, remove, update } from "./tasks.handlers.ts";

const app = createApp("/tasks")
  .get("/", ...list)
  .post("/", ...create)
  .get("/:id", ...getOne)
  .patch("/:id", ...update)
  .delete("/:id", ...remove);

export default app;
export type AppType = typeof app;
