// deno-lint-ignore-file no-explicit-any
import type { Kysely, Migration } from "kysely";

export const Migration01: Migration = {
  async up(db: Kysely<any>) {
    await db.schema
      .createTable("task")
      .addColumn("id", "integer", (cb) => cb.primaryKey().autoIncrement())
      .addColumn("text", "text", (cb) => cb.notNull())
      .addColumn("completed", "integer", (cb) => cb.notNull().defaultTo(0))
      .addColumn(
        "created_at",
        "text",
        (cb) => cb.notNull().defaultTo("datetime('now')"),
      )
      .addColumn(
        "updated_at",
        "text",
        (cb) => cb.notNull().defaultTo("datetime('now')"),
      )
      .execute();

    await db
      .insertInto("task")
      .values({ text: "Learn Kysely", completed: 0 })
      .execute();
  },

  async down(db: Kysely<any>) {
    await db.schema.dropTable("task").execute();
  },
};
