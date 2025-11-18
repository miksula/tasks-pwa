import { createClient } from "@libsql/client/web";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { Kysely } from "kysely";

import type { Database } from "@app/api/schema";

// start sqld server with `turso dev --db-file apps/api/src/db/api.db --port 8088`
const client = createClient({
  url: "http://127.0.0.1:8088",
});

export const db = new Kysely<Database>({
  // deno-lint-ignore no-explicit-any
  dialect: new LibsqlDialect({ client: client as unknown as any }),
});
