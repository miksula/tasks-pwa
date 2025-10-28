import type { Generated, Insertable, Selectable, Updateable } from "kysely";
import * as z from "zod";

export type _Task = {
  id: Generated<number>;
  text: string;
  completed: 0 | 1;
  created_at: Generated<string>;
  updated_at: Generated<string>;
};

export type _TaskSelect = Selectable<_Task>;
export type _TaskInsert = Insertable<_Task>;
export type _TaskUpdate = Updateable<_Task>;

export const idParamsSchema = z.object({
  id: z.coerce.number(),
});

// export const taskSchema = z.object({
//   id: z.number(),
//   text: z.string(),
//   completed: z.boolean(),
//   created_at: z.string(),
//   updated_at: z.string(),
// });

// export const taskCreateSchema = z.object({
//   text: z.string(),
//   completed: z.boolean().optional(),
// });

// export const taskUpdateSchema = z.object({
//   text: z.string().optional(),
//   completed: z.boolean().optional(),
// });

// export type IdParams = z.infer<typeof idParamsSchema>;
// export type Task = z.infer<typeof taskSchema>;
// export type TaskSelect = z.infer<typeof taskSchema>;
// export type TaskInsert = z.infer<typeof taskCreateSchema>;
// export type TaskUpdate = z.infer<typeof taskUpdateSchema>;

/*
Converting the the following TypeScript type to Zod schema:

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

export type Task = z.infer<typeof taskSchema>;
export type TaskSelect = Selectable<Task>;
export type TaskInsert = Insertable<Task>;
export type TaskUpdate = Updateable<Task>;
