import { db } from "../client.ts";
import { sql } from "kysely";

console.log("🔍 Debugging SQLite Timezone Behavior\n");

try {
  // Test the actual functions
  console.log("1. Testing SQLite time functions:");

  const timeTest = await db
    .selectNoFrom(() => [
      sql<string>`datetime('now')`.as("local_now"),
      sql<string>`datetime('now', 'utc')`.as("utc_now"),
      sql<string>`datetime('now', 'localtime')`.as("localtime_now"),
    ])
    .executeTakeFirst();

  console.log("datetime('now'):", timeTest?.local_now);
  console.log("datetime('now', 'utc'):", timeTest?.utc_now);
  console.log("datetime('now', 'localtime'):", timeTest?.localtime_now);

  console.log("\n2. Testing actual table behavior:");

  // Insert a test record
  await db
    .insertInto("task")
    .values({
      text: "Timezone test",
      completed: 0,
    })
    .execute();

  // Get the record to see created_at
  const testRecord = await db
    .selectFrom("task")
    .select(["id", "text", "created_at", "updated_at"])
    .where("text", "=", "Timezone test")
    .executeTakeFirst();

  console.log("Record after INSERT (created_at):", testRecord?.created_at);
  console.log("Record after INSERT (updated_at):", testRecord?.updated_at);

  if (testRecord) {
    // Update the record to trigger the UPDATE trigger
    await db
      .updateTable("task")
      .set({ text: "Timezone test UPDATED" })
      .where("id", "=", testRecord.id)
      .execute();

    // Get the record again to see updated_at
    const updatedRecord = await db
      .selectFrom("task")
      .select(["id", "text", "created_at", "updated_at"])
      .where("id", "=", testRecord.id)
      .executeTakeFirst();

    console.log("\nAfter UPDATE trigger:");
    console.log("created_at (should be same):", updatedRecord?.created_at);
    console.log("updated_at (from trigger):", updatedRecord?.updated_at);

    // Compare timestamps
    const createdTime = new Date(testRecord.created_at + "Z");
    const updatedTime = new Date(updatedRecord?.updated_at + "Z");
    const diffMinutes =
      Math.abs(updatedTime.getTime() - createdTime.getTime()) / (1000 * 60);

    console.log("\nTime difference:", diffMinutes.toFixed(2), "minutes");

    if (diffMinutes > 5) {
      console.log("⚠️  WARNING: Significant time difference detected!");
      console.log(
        "This suggests different timezone handling between DEFAULT and TRIGGER",
      );
    }

    // Clean up test record
    await db
      .deleteFrom("task")
      .where("id", "=", testRecord.id)
      .execute();
  }

  console.log("\n3. System timezone info:");
  const jsDate = new Date();
  console.log(
    "JavaScript timezone offset (minutes):",
    jsDate.getTimezoneOffset(),
  );
  console.log(
    "System timezone:",
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
} catch (error) {
  console.error("Error:", error);
} finally {
  await db.destroy();
}
