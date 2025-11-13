import { db } from "./client.ts";

async function getTasks() {
  return await db.selectFrom("todo").selectAll().execute();
}

const tasks = await getTasks();
console.log("Tasks:", tasks);
