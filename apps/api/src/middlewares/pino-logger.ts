import { pinoLogger as logger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

const envObject = Deno.env.toObject();

export function pinoLogger() {
  return logger({
    pino: pino(
      {
        level: envObject.LOG_LEVEL || "info",
      },
      envObject.ENV === "production" ? undefined : pretty(),
    ),
  });
}
