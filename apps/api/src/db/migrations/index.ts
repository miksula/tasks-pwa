import type { Migration } from "kysely";

import { Migration01 } from "./2025-10-26-create-table-task.ts";

export const migrations: Record<string, Migration> = {
  "2025-10-26-create-table-task": Migration01,
};
