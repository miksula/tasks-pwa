import createApp from "../lib/create-app.ts";
import * as Status from "stoker/http-status-codes";

const app = createApp()
  .get("/", function Index(c) {
    return c.json({
      message: "API index",
    }, Status.OK);
  });

export default app;
