import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { factory, statusCode } from "../utils";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";

// signup hanndler

const signUpUser = factory.createHandlers(async (c) => {
  //   connect to the db
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    if (!prisma) {
      return c.json({
        error: "prisma client connection faild not found",
      });
    }

    // password encryption before user signup
    const saltRounds = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(body.password, saltRounds);

    const user = await prisma.user.create({
      data: {
        name: body?.name,
        email: body.email,
        password: hashPassword,
      },
    });

    // generate token
    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      token: jwtToken,
    });
  } catch (e: any) {
    console.log(e);
    c.status(statusCode.INTERNAL_SERVER_ERROR);
    return c.json({ error: e.message });
  }
});

// signin handler
const signInUser = factory.createHandlers(async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    if (!prisma) {
      return c.json({
        error: "prisma client connection faild not found",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }

    // hash Pass check
    const passCheck = bcrypt.compareSync(body.password, user?.password || "");

    if (!passCheck) {
      c.status(403);
      return c.json({ error: "password not matched" });
    }

    console.log({ passCheck: passCheck });

    const userVerify = await sign({ id: user.id }, c.env.JWT_SECRET);
    if (!userVerify) {
      c.status(403);
      return c.json({ error: "not verified user" });
    }
    return c.text(userVerify);
  } catch (error: any) {
    console.log(error.message);
    c.status(403);
    return c.json({ error: error.message });
  }
});

export { signUpUser, signInUser };
