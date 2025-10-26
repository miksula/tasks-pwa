import { db } from "../client.ts";
import { sql } from "kysely";

console.log("SQLite Time Function Test\n");

try {
  const result = await db
    .selectNoFrom(() => [
      sql<string>`datetime('now')`.as("sqlite_now"),
      sql<string>`datetime('now', 'utc')`.as("sqlite_utc"),
      sql<string>`datetime('now', 'localtime')`.as("sqlite_localtime"),
      sql<string>`strftime('%s', 'now')`.as("unix_timestamp"),
    ])
    .executeTakeFirst();

  console.log("SQLite time functions:");
  console.log("datetime('now'):", result?.sqlite_now);
  console.log("datetime('now', 'utc'):", result?.sqlite_utc);
  console.log("datetime('now', 'localtime'):", result?.sqlite_localtime);
  console.log("Unix timestamp:", result?.unix_timestamp);

  // Compare with JavaScript
  const jsNow = new Date();
  console.log("\nJavaScript comparison:");
  console.log("JS local time:", jsNow.toLocaleString());
  console.log(
    "JS UTC time:",
    jsNow.toISOString().replace("T", " ").slice(0, 19),
  );
  console.log("JS Unix timestamp:", Math.floor(jsNow.getTime() / 1000));

  // Check system timezone
  console.log("\nSystem info:");
  console.log("JS timezone offset (minutes):", jsNow.getTimezoneOffset());
  console.log("Timezone:", Intl.DateTimeFormat().resolvedOptions().timeZone);
} catch (error) {
  console.error("Error:", error);
} finally {
  await db.destroy();
}
