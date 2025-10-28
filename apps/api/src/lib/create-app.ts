import { type Context, Hono } from "hono";
import { requestId } from "hono/request-id";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { pinoLogger } from "../middlewares/pino-logger.ts";

export function notFoundHandler(c: Context) {
  return c.json(
    {
      message: HttpStatusPhrases.NOT_FOUND,
    },
    HttpStatusCodes.NOT_FOUND,
  );
}

export default function createApp() {
  const app = new Hono()
    .use(requestId())
    .use(pinoLogger());

  app.notFound(notFoundHandler);
  return app;
}
