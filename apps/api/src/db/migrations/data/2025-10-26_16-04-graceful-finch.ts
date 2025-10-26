// Migration: 2025-10-26_16-04-graceful-finch.ts
import { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<any>) {
  await sql`
      CREATE TABLE task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now', 'utc')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now', 'utc'))
      )
    `.execute(db);

  // Trigger for auto-updating timestamps on update
  await sql`
      CREATE TRIGGER update_task_timestamp 
      AFTER UPDATE ON task
      BEGIN
          UPDATE task SET updated_at = (datetime('now', 'utc')) WHERE id = NEW.id;
      END;
    `.execute(db);

  await sql`
      INSERT INTO task (text, completed) VALUES ('Learn Kysely', 0)
    `.execute(db);
}

export async function down(db: Kysely<any>) {
  await sql`DROP TABLE task`.execute(db);
}
