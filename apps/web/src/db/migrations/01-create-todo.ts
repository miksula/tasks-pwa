import type { Kysely, Migration } from "kysely";

export const Migration01: Migration = {
  async up(db: Kysely<any>) {
    await db.schema
      .createTable("todo")
      .addColumn("id", "integer", (cb) => cb.primaryKey().autoIncrement())
      .addColumn("text", "text")
      .addColumn("completed", "integer")
      .execute();

    await db
      .insertInto("todo")
      .values({ text: "Learn Kysely", completed: 0 })
      .execute();
  },
  async down(db: Kysely<any>) {
    await db.schema.dropTable("todo").execute();
  },
};
