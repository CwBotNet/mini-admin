import { Hono } from "hono";
import { authCheck } from "../middleware";
import {
  createMiniAdmin,
  deleteMiniAdmin,
  getMiniAdmin,
  getMiniAdminById,
  logOut,
  updateMiniAdmin,
} from "../handlers/admin.handler";

const adminRouter = new Hono();

// middleware
adminRouter.use("/*", authCheck);

// handler routes
adminRouter.get("/miniadmin", ...getMiniAdmin);

adminRouter.get("/miniadmin/:id", ...getMiniAdminById);

adminRouter.post("/miniadmin", ...createMiniAdmin);

adminRouter.put("/miniadmin", ...updateMiniAdmin);

adminRouter.delete("/miniadmin/:id", ...deleteMiniAdmin);

adminRouter.get("/logout", ...logOut);

export { adminRouter };
