import { migrator } from "./migrations/migrator.ts";

console.log("📊 Database Migration Status\n");

try {
  const migrations = await migrator.getMigrations();

  console.log("Available migrations:");
  migrations.forEach((migration, index) => {
    const status = migration.executedAt ? "✅ Executed" : "⏳ Pending";
    const date = migration.executedAt
      ? new Date(migration.executedAt).toISOString()
      : "Not executed";
    console.log(`${index + 1}. ${migration.name}`);
    console.log(`   Status: ${status}`);
    console.log(`   Date: ${date}\n`);
  });
} catch (error) {
  console.error("❌ Error checking migration status:", error);
}
