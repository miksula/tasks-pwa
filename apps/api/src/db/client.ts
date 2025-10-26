import type { Database } from "./schema/index.ts";

import { Kysely } from "kysely";
import { Database as Sqlite } from "@db/sqlite";
import { DenoSqlite3Dialect } from "@soapbox/kysely-deno-sqlite";

export const db = new Kysely<Database>({
  dialect: new DenoSqlite3Dialect({ database: new Sqlite("api.db") }),
});
