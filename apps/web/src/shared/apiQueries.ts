import apiClient from "./apiClient.ts";

export async function fetchTasks() {
  const response = await apiClient.api.tasks.$get();
  const json = await response.json();
  return json;
}

export async function createTask(task: any) {
  const response = await apiClient.api.tasks.$post({
    json: task,
  });
  const json = await response.json();
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
    console.log("deleteTask error response:", json);
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
    console.log("updateTask error response:", json);
  }
}
