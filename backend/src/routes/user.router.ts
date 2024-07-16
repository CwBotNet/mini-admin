import { Hono } from "hono";
import { signInUser, signUpUser } from "../handlers";

const userRouter = new Hono();

userRouter.post("/signin", ...signInUser);
userRouter.post("/signup", ...signUpUser);

export { userRouter };
