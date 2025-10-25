import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import * as z from "zod";
import { createFactory } from "hono/factory";
import { zValidator } from "@hono/zod-validator";

const factory = createFactory();

const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

const IdParamsSchema = z.object({
  id: z.coerce.number(),
});

// type Task = z.infer<typeof taskSchema>;

const tasks = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
];

const list = factory.createHandlers(
  function listTasks(c) {
    return c.json(tasks);
  },
);

const create = factory.createHandlers(
  zValidator("json", taskSchema),
  function createTask(c) {
    const task = c.req.valid("json");
    tasks.push(task);
    return c.json(task, HttpStatusCodes.OK);
  },
);

const getOne = factory.createHandlers(
  zValidator("param", IdParamsSchema),
  function getTask(c) {
    const { id } = c.req.valid("param");
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return c.json(
        {
          message: HttpStatusPhrases.NOT_FOUND,
        },
        HttpStatusCodes.NOT_FOUND,
      );
    }

    return c.json(task, HttpStatusCodes.OK);
  },
);

const update = factory.createHandlers(
  zValidator("param", IdParamsSchema),
  zValidator("json", taskSchema.omit({ id: true })),
  function updateTask(c) {
    const { id } = c.req.valid("param");
    const task = c.req.valid("json");
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      return c.json(
        {
          message: HttpStatusPhrases.NOT_FOUND,
        },
        HttpStatusCodes.NOT_FOUND,
      );
    }

    tasks[index] = { id, ...task };

    return c.json(task, HttpStatusCodes.OK);
  },
);

const remove = factory.createHandlers(
  zValidator("param", IdParamsSchema),
  function deleteTask(c) {
    const { id } = c.req.valid("param");
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      return c.json(
        {
          message: HttpStatusPhrases.NOT_FOUND,
        },
        HttpStatusCodes.NOT_FOUND,
      );
    }

    tasks.splice(index, 1);

    return c.body(null, HttpStatusCodes.NO_CONTENT);
  },
);

export { create, getOne, list, remove, update };
