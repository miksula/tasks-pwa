import createApp from "../lib/create-app.ts";

const app = createApp()
  .get("/", (c) => c.json({ message: "API Index" }, 200));

export default app;
