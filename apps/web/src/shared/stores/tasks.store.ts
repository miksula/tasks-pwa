import type { Filter, TodoItem } from "@/shared/types.ts";
import action from "@/shared/action.ts";
import * as queries from "../queries.ts";

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
      filter: "all",
    };
  }

  @action
  async add(text: string) {
    await queries.createTask({ text, completed: 0 });
  }

  @action
  async delete(id: string) {
    await queries.deleteTask(Number(id));
  }

  @action
  async completed(id: string, completed: 0 | 1) {
    await queries.updateTask(Number(id), { completed });
  }
}

export default new TasksStore();
