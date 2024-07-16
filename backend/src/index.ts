import { Hono } from "hono";
import { userRouter } from "./routes";
import { Env } from "./utils";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: Env;
}>().basePath("/api/v1");

app.use("/*", cors());

app.get("/healthcheck", (c) => {
  return c.text("working server!");
});

// routing
app.route("/user", userRouter);

export default app;
