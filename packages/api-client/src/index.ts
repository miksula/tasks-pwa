import type { AppType } from "@app/api/routes";
import { hc } from "hono/client";

const client = hc<AppType>("");
export type Client = typeof client;

/**
 * Creates a new Hono API client instance.
 *
 * @param args - Specify the server URL as first argument, and optional configuration as second argument.
 * @returns A configured API client instance.
 *
 * @example
 * ```typescript
 * const client = createClient('https://api.example.com');
 *
 * const taskResult = await client.tasks[":id"].$get({
 *   param: {
 *     id: "1",
 *   },
 * });
 * ```
 */
export default function createClient(...args: Parameters<typeof hc>): Client {
  return hc<AppType>(...args);
}
