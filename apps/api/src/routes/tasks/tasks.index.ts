import createApp from "../../lib/create-app.ts";
import * as Status from "stoker/http-status-codes";
import * as z from "zod";
import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";

const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

// type Task = z.infer<typeof taskSchema>;

const tasks = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
];

const factory = createFactory();

const createTaskHandlers = factory.createHandlers(
  zValidator("json", taskSchema),
  function createTask(c) {
    const task = c.req.valid("json");
    tasks.push(task);
    return c.json(task, Status.OK);
  },
);

const listTasksHandlers = factory.createHandlers(function listTasks(c) {
  return c.json(tasks);
});

const app = createApp("/tasks")
  .get("/", ...listTasksHandlers)
  .post("/", ...createTaskHandlers);

// .get("/:id", getTask)
// .patch("/:id", updateTask)
// .delete("/:id", deleteTask);

export default app;
export type AppType = typeof app;
