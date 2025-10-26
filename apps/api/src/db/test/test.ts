import { db } from "../client.ts";

async function getTasks() {
  return await db.selectFrom("task").selectAll().execute();
}

const tasks = await getTasks();
console.log("Tasks:", tasks);
