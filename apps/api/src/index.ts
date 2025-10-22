import app from "./app.ts";
import env from "./env.ts";

const port = env.PORT;
console.log(`Server is running on port http://localhost:${port}`);

Deno.serve({ port, hostname: "127.0.0.1" }, app.fetch);
