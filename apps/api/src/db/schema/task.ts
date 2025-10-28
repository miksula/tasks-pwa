import type { Generated, Insertable, Selectable, Updateable } from "kysely";
import * as z from "zod";

export const idParamsSchema = z.object({
  id: z.coerce.number(),
});

/*
Converting the Task type to Zod schema:

export type Task = {
  id: Generated<number>;
  text: string;
  completed: 0 | 1;
  created_at: Generated<string>;
  updated_at: Generated<string>;
};
*/
export const taskSchema = z.object({
  id: z.custom<Generated<number>>(),
  text: z.string(),
  completed: z.union([z.literal(0), z.literal(1)]),
  created_at: z.custom<Generated<string>>(),
  updated_at: z.custom<Generated<string>>(),
});

export const taskCreateSchema = z.object({
  text: z.string(),
  completed: z.union([z.literal(0), z.literal(1)]),
});

export const taskUpdateSchema = z.object({
  text: z.string().optional(),
  completed: z.union([z.literal(0), z.literal(1)]).optional(),
});

/*
Table schema for Kysely:
*/
export type Task = z.infer<typeof taskSchema>;
/*
Utility types for Kysely operations:
*/
export type TaskSelect = Selectable<Task>;
export type TaskInsert = Insertable<Task>;
export type TaskUpdate = Updateable<Task>;
