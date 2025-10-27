import type { Database } from "../schema/index.ts";
import SQLite from "libsql";
import { Kysely, SqliteDialect } from "kysely";

const dbFilePath = new URL("../api.db", import.meta.url).pathname;
console.log("Database file path:", dbFilePath);

export const db = new Kysely<Database>({
  dialect: new SqliteDialect({
    database: new SQLite(dbFilePath),
  }),
});

async function getTasks() {
  return await db.selectFrom("task").selectAll().execute();
}

const tasks = await getTasks();
console.log("Tasks:", tasks);
