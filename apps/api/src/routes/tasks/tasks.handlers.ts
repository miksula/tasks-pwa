import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { createFactory } from "hono/factory";
import { zValidator } from "@hono/zod-validator";
import {
  idParamsSchema,
  taskCreateSchema,
  taskUpdateSchema,
} from "../../db/schema/task.ts";
import { db } from "../../db/client.ts";

const factory = createFactory();

const list = factory.createHandlers(
  async function listTasks(c) {
    const tasks = await db.selectFrom("task").selectAll().execute();
    return c.json(tasks);
  },
);

const create = factory.createHandlers(
  zValidator("json", taskCreateSchema),
  async function createTask(c) {
    const task = c.req.valid("json");
    const createdTask = await db.insertInto("task").values(task)
      .returningAll().executeTakeFirst();
    console.log("Created task:", createdTask);
    return c.json(createdTask, HttpStatusCodes.CREATED);
  },
);

const getOne = factory.createHandlers(
  zValidator("param", idParamsSchema),
  async function getTask(c) {
    const { id } = c.req.valid("param");
    const task = await db.selectFrom("task").selectAll().where("id", "=", id)
      .executeTakeFirst();

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
  zValidator("param", idParamsSchema),
  zValidator("json", taskUpdateSchema),
  async function updateTask(c) {
    const { id } = c.req.valid("param");
    const updates = c.req.valid("json");

    if (Object.keys(updates).length == 0) {
      return c.json(
        {
          success: false,
          error: {
            issues: [
              {
                code: "Invalid updates",
                path: [],
                message: "No fields to update were provided",
              },
            ],
            name: "ZodError",
          },
        },
        HttpStatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    const [task] = await db.updateTable("task")
      .set(updates)
      .where("id", "=", id)
      .execute();

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

const remove = factory.createHandlers(
  zValidator("param", idParamsSchema),
  async function deleteTask(c) {
    const { id } = c.req.valid("param");
    const result = await db.deleteFrom("task").where("id", "=", id)
      .executeTakeFirst();

    if (result.numDeletedRows === 0n) {
      return c.json(
        {
          message: HttpStatusPhrases.NOT_FOUND,
        },
        HttpStatusCodes.NOT_FOUND,
      );
    }

    return c.body(null, HttpStatusCodes.NO_CONTENT);
  },
);

export { create, getOne, list, remove, update };
