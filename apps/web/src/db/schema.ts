import type {
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export type Database = {
  todo: TodoTable;
};

export type TodoTable = {
  id: Generated<number>;
  text: string;
  completed: 0 | 1;
};

export type Todo = Selectable<TodoTable>;
export type NewTodo = Insertable<TodoTable>;
export type TodoUpdate = Updateable<TodoTable>;
