import { db } from "./db/client.ts";
import type { NewTodo } from "./db/schema.ts";

export async function fetchTasks() {
  return await db.selectFrom("todo").selectAll().execute();
}

export async function createTask(task: NewTodo) {
  await db.insertInto("todo").values(task).execute();
}

export async function deleteTask(id: number) {
  await db.deleteFrom("todo").where("id", "=", id).execute();
}

export async function updateTask(id: number, updates: Partial<NewTodo>) {
  await db.updateTable("todo").set(updates).where("id", "=", id).execute();
}
