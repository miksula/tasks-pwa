import { db } from "./client.ts";
import type { TaskInsert, TaskUpdate } from "@app/api/schema/task.ts";

export async function fetchTasks() {
  return await db.selectFrom("task").selectAll().execute();
}

export async function createTask(task: TaskInsert) {
  await db.insertInto("task").values(task).execute();
}

export async function deleteTask(id: number) {
  await db.deleteFrom("task").where("id", "=", id).execute();
}

export async function updateTask(id: number, updates: Partial<TaskUpdate>) {
  await db.updateTable("task").set(updates).where("id", "=", id).execute();
}
