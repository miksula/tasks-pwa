// import { Hono } from "hono";
// import { requestId } from "hono/request-id";
// import { pinoLogger } from "./middlewares/pino-logger.ts";
import createApp from "./lib/create-app.ts";
import index from "./routes/index.route.ts";
import tasks from "./routes/tasks/tasks.index.ts";

// function createApp() {
//   const app = new Hono()
//     .use(requestId())
//     .use(pinoLogger());

//   app.notFound((c) => c.json({ message: "Not Found" }, 404));
//   return app;
// }

const app = createApp();

// Create the main app and chain routes for proper RPC type inference
const routes = app
  .route("/", index)
  .route("/tasks", tasks);

// Export the type from the chained routes
export type AppType = typeof routes;

export default routes;
