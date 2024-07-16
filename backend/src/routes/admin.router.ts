import { Hono } from "hono";

const adminRouter = new Hono();

adminRouter.get("/miniadmin");
adminRouter.post("/miniadmin");
adminRouter.put("/miniadmin");
adminRouter.delete("/miniadmin");

export { adminRouter };
