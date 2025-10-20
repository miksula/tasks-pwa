import { createClient } from "@libsql/client/web";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { Kysely } from "kysely";

import type { Database } from "./schema.ts";

// start sqld server with: turso dev --db-file web.db
const client = createClient({
  url: "http://127.0.0.1:8080",
});

export const db = new Kysely<Database>({
  dialect: new LibsqlDialect({ client: client as unknown as any }),
});
