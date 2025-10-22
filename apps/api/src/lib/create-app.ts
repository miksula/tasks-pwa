import { Hono } from "hono";
import { requestId } from "hono/request-id";

import { pinoLogger } from "../middlewares/pino-logger.ts";

export default function createApp(basePath?: string) {
  let app;

  if (basePath) {
    app = new Hono().basePath(basePath);
  } else {
    app = new Hono();
  }

  app.use(requestId()).use(pinoLogger());

  app.notFound((c) => c.json({ message: "Not Found" }, 404));
  return app;
}
