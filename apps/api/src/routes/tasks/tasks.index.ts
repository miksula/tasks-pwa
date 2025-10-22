import createApp from "../../lib/create-app.ts";

const app = createApp("/tasks")
  .get("/", (c) => c.json("list tasks"))
  .post("/", (c) => c.json("create a task", 201))
  .get("/:id", (c) => c.json(`get ${c.req.param("id")}`))
  .patch("/:id", (c) => c.json(`update ${c.req.param("id")}`))
  .delete("/:id", (c) => c.json(`delete ${c.req.param("id")}`));

export default app;
export type AppType = typeof app;
