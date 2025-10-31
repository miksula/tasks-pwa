import apiClient from "./api-client.ts";
import formatApiError from "./format-api-error.ts";

export async function createTask(task: any) {
  const response = await apiClient.api.tasks.$post({
    json: task,
  });
  const json = await response.json();
  if ("success" in json) {
    const message = formatApiError(json);
    throw new Error(message);
  }
  return json;
}

export async function deleteTask(id: string) {
  const response = await apiClient.api.tasks[":id"].$delete({
    param: {
      id,
    },
  });
  if (response.status !== 204) {
    const json = await response.json();
    if ("message" in json) {
      throw new Error(json.message);
    }
    const message = formatApiError(json);
    throw new Error(message);
  }
}

export async function updateTask({ id, task }: { id: string; task: any }) {
  const response = await apiClient.api.tasks[":id"].$patch({
    param: {
      id,
    },
    json: task,
  });
  if (response.status !== 200) {
    const json = await response.json();
    if ("message" in json) {
      throw new Error(json.message);
    }
    const message = formatApiError(json);
    throw new Error(message);
  }
}
