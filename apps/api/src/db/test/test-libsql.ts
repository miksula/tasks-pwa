import { createClient } from "@libsql/client";

const db = createClient({
  url: "file:api.db",
});

const tasks = await db.execute({
  sql: "SELECT * FROM task WHERE id = ?",
  args: [1],
});

console.log("Tasks:", tasks.rows);
