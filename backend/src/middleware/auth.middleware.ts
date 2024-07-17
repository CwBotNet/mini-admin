import { verify } from "hono/jwt";
import { factory } from "../utils";
import { getCookie } from "hono/cookie";

const authCheck = factory.createMiddleware(async (c, next) => {
  const token = getCookie(c, "token") || " ";
  console.log(token);

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (!user) {
      c.status(403);
      return c.json({ error: "not a valid token" });
    }
    // sending the user id from context
    c.set("userId", user.id);
    await next();
  } catch (error) {
    c.status(403);
    return c.json({ error: "not a valid token" });
  }
});

export { authCheck };
