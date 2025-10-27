import type { Database } from "./schema/index.ts";
import SQLite from "libsql"; // compatible with better-sqlite3, that SqliteDialect uses
import { Kysely, SqliteDialect } from "kysely";

// Get absolute path to the database file, using Deno APIs
const dbFile = new URL("./api.db", import.meta.url).pathname;

export const db = new Kysely<Database>({
  dialect: new SqliteDialect({
    database: new SQLite(dbFile),
  }),
});
