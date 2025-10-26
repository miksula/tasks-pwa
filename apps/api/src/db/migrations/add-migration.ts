import { ensureDir } from "@std/fs";

const adjectives = [
  "quick",
  "lazy",
  "happy",
  "sad",
  "bright",
  "dark",
  "silent",
  "loud",
  "brave",
  "shy",
  "clever",
  "fierce",
  "gentle",
  "proud",
  "kind",
  "bold",
  "calm",
  "eager",
  "fancy",
  "graceful",
];

const birds = [
  "robin",
  "sparrow",
  "cardinal",
  "bluejay",
  "hawk",
  "eagle",
  "owl",
  "crow",
  "finch",
  "wren",
  "dove",
  "falcon",
  "heron",
  "swan",
  "duck",
  "goose",
  "pelican",
  "crane",
  "woodpecker",
  "hummingbird",
  "kingfisher",
  "magpie",
  "raven",
  "peacock",
];

function getRandomWord(): string {
  const bird = birds[Math.floor(Math.random() * birds.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  return `${adjective}-${bird}`;
}

function getTimestamp(): string {
  const now = new Date();
  return now.toISOString().replace("T", "_").replace(/:/g, "-").slice(0, 16);
}

function toSnakeCase(str: string): string {
  return str.replace(/-/g, "_");
}

async function createMigrationFile(): Promise<void> {
  const timestamp = getTimestamp();
  const randomWord = getRandomWord();
  const filename = `${timestamp}-${randomWord}.ts`;
  const migrationPath = `./data/${filename}`;

  await ensureDir("./data");

  const migrationContent = `// Migration: ${filename}
import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}
`;

  await Deno.writeTextFile(migrationPath, migrationContent);

  // Update index.ts
  const indexPath = "./index.ts";
  let indexContent = "";

  try {
    indexContent = await Deno.readTextFile(indexPath);
  } catch {
    // File doesn't exist
    indexContent = "";
  }

  const importStatement = `// import * as Migration_${
    toSnakeCase(timestamp)
  } from "./data/${filename}";\n`;
  const updatedContent = importStatement + indexContent;

  await Deno.writeTextFile(indexPath, updatedContent);

  console.log(`Created migration file: ${migrationPath}`);
  console.log(`Updated: ${indexPath}`);
}

if (import.meta.main) {
  await createMigrationFile();
}
