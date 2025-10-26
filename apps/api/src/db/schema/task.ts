import type { Generated, Insertable, Selectable, Updateable } from "kysely";

export type TaskTable = {
  id: Generated<number>;
  text: string;
  completed: 0 | 1;
  created_at: Generated<string>;
  updated_at: Generated<string>;
};

export type Task = Selectable<TaskTable>;
export type NewTask = Insertable<TaskTable>;
export type TaskUpdate = Updateable<TaskTable>;
