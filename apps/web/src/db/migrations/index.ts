import type { Migration } from "kysely";

import { Migration01 } from "./01-create-todo.ts";

export const migrations: Record<string, Migration> = {
  "01": Migration01,
};
