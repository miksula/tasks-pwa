/*
1. Global App Data → Store
    User authentication
    App settings
    Shared task lists
    Navigation state

2. Route-Specific Data → Router + Store
    Task details for specific ID
    User profile pages
    Report data for specific date ranges

3. Component-Local Data → Components
    Form validation
    Search autocomplete
    Temporary UI state
    Real-time updates

Key Takeaways:
    Store-centric approach is best for your Redux-style architecture
    Router can trigger store actions for route-specific data
    Components handle only local, temporary data
    Avoid data fetching in components for shared/persistent data
    Use the store as your single source of truth for application state
*/

// import type { State } from "@/web/lib/types";

// import { dispatchEvent } from "@/web/lib/app-store";

// export class DataFetcher {
//   private appElement: HTMLElement;

//   constructor(appElement: HTMLElement) {
//     this.appElement = appElement;
//   }

//   // Store-centric: Global data
//   async fetchTasks() {
//     dispatchEvent(this.appElement, { type: "FETCH_TASKS_START" });
//     try {
//       // const tasks = await api.getTasks();
//       const tasks = []; // Mock data
//       dispatchEvent(this.appElement, { type: "FETCH_TASKS_SUCCESS", payload: tasks });
//     }
//     catch (error) {
//       dispatchEvent(this.appElement, { type: "FETCH_TASKS_ERROR", error: error.message });
//     }
//   }

//   // Route-specific: Called by router
//   async fetchTaskDetail(taskId: string) {
//     dispatchEvent(this.appElement, { type: "FETCH_TASK_DETAIL_START", taskId });
//     try {
//       // const task = await api.getTask(taskId);
//       const task = { id: taskId, title: `Task ${taskId}` }; // Mock data
//       dispatchEvent(this.appElement, { type: "FETCH_TASK_DETAIL_SUCCESS", payload: task });
//     }
//     catch (error) {
//       dispatchEvent(this.appElement, { type: "FETCH_TASK_DETAIL_ERROR", error: error.message });
//     }
//   }

//   // Save operations
//   async saveTask(task: any) {
//     dispatchEvent(this.appElement, { type: "SAVE_TASK_START" });
//     try {
//       // const savedTask = await api.saveTask(task);
//       const savedTask = task; // Mock
//       dispatchEvent(this.appElement, { type: "SAVE_TASK_SUCCESS", payload: savedTask });
//     }
//     catch (error) {
//       dispatchEvent(this.appElement, { type: "SAVE_TASK_ERROR", error: error.message });
//     }
//   }
// }
