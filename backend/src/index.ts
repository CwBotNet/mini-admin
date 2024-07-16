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
    origin: [
      "http://localhost:3000",
      "https://mini-admin-pi.vercel.app/",
      "https://mini-admin-git-main-raj-sahanis-projects.vercel.app/",
      "https://mini-admin-8n4k2ibh4-raj-sahanis-projects.vercel.app/",
    ],
  })
);

app.get("/healthcheck", (c) => {
  return c.text("working server!");
});

// routing
app.route("/user", userRouter);
app.route("/admin", adminRouter);

export default app;
