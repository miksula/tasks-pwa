import { migrator } from "./migrations/migrator.ts";

// import * as path from "node:path";
// import { promises as fs } from "node:fs";
// import { FileMigrationProvider, Migrator } from "kysely";
// import { db } from "./client.ts";

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// const migrator = new Migrator({
//   db,
//   provider: new FileMigrationProvider({
//     fs,
//     path,
//     // This needs to be an absolute path.
//     migrationFolder: path.join(__dirname, "migrations"),
//   }),
// });

const { error, results } = await migrator.migrateToLatest();

results?.forEach((it) => {
  if (it.status === "Success") {
    console.log(`migration "${it.migrationName}" was executed successfully`);
  } else if (it.status === "Error") {
    console.error(`failed to execute migration "${it.migrationName}"`);
  }
});

if (error) {
  console.error("failed to run `migrateToLatest`");
  console.error(error);
}
