import createApp from "@/api/lib/create-app";

const app = createApp()
  .get("/", c =>
    c.json({ message: "API Index" }, 200));

export default app;
