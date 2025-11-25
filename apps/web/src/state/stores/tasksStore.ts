import type { Filter, TodoItem } from "@/lib/types.ts";
import action from "@/state/action.ts";
import * as queries from "@/services/db/queries.ts";
import * as storage from "@/services/db/storage.ts";

export type Tasks = {
  items: TodoItem[];
  filter: Filter;
};

const initialState: Tasks = {
  items: [],
  filter: "all",
};

class TasksStore {
  public initialState = initialState;

  async load(): Promise<Tasks> {
    return {
      items: await queries.fetchTasks(),
      filter: await storage.getFilter(),
    };
  }

  /**
   * Sets the current filter for tasks.
   * @param filter - The filter to set (e.g., "all", "active", "completed").
   */
  @action
  async setFilter(filter: Filter) {
    await storage.setFilter(filter);
  }

  /**
   * Adds a new task to the store.
   * @param text - The task description.
   */
  @action
  async add(text: string) {
    await queries.createTask({ text, completed: 0 });
  }

  /**
   * Removes a task from the store by its ID.
   * @param id - The ID of the task to delete.
   */
  @action
  async delete(id: string) {
    await queries.deleteTask(Number(id));
  }

  /**
   * Updates the completion status of a task.
   * @param id - The ID of the task to update.
   * @param completed - The new completion status (0 or 1).
   */
  @action
  async completed(id: string, completed: 0 | 1) {
    await queries.updateTask(Number(id), { completed });
  }

  /**
   * Edits the text of a task.
   * @param id - The ID of the task to edit.
   * @param text - The new text for the task.
   */
  @action
  async edit(id: string, text: string) {
    await queries.updateTask(Number(id), { text });
  }
}

export default new TasksStore();
