import { db } from "./client";

async function getTasks() {
  return await db.selectFrom("todo").selectAll().execute();
}

const tasks = await getTasks();
console.log("Tasks:", tasks);
