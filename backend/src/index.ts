import { Hono } from "hono";
import { adminRouter, userRouter } from "./routes";
import { Env } from "./utils";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: Env;
}>().basePath("/api/v1");

app.use(
  "/*",
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.get("/healthcheck", (c) => {
  return c.text("working server!");
});

// routing
app.route("/user", userRouter);
app.route("/admin", adminRouter);

export default app;
