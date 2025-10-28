import createApp from "./lib/create-app.ts";
import index from "./routes/index.route.ts";
import tasks from "./routes/tasks/tasks.index.ts";

// Create the main app instance
const app = createApp();

// Chain routes for proper RPC type inference
const routes = app
  .route("/", index)
  .route("/tasks", tasks);

// Export the type from the chained routes
export type AppType = typeof routes;

export default routes;
