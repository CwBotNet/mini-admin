import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { factory, statusCode } from "../utils";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";
import { deleteCookie, setCookie } from "hono/cookie";

const options = {
  httpOnly: true,
  secure: true,
};

// signup hanndler

const signUpUser = factory.createHandlers(async (c) => {
  //   connect to the db
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });
  try {
    if (!prisma) {
      return c.json({
        error: "prisma client connection faild not found",
      });
    }

    const body = await c.req.json();

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

    if (!user) {
      return c.json(
        {
          failed: "email already exist",
        },
        statusCode.BAD_REQUEST
      );
    }

    // generate token
    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);

    // set auth cookie
    setCookie(c, "token", jwtToken);
    Cookies.set("token", jwtToken);
    return c.json({
      token: jwtToken,
      status: "created sussessful",
    });
  } catch (e: any) {
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

    const accessToken = await sign({ id: user.id }, c.env.JWT_SECRET);

    // setCookie
    setCookie(c, "token", accessToken);
    Cookies.set("token", accessToken);

    if (!accessToken) {
      c.status(403);
      return c.json({ error: "not verified user" });
    }
    return c.text(accessToken);
  } catch (error: any) {
    console.log(error.message);
    c.status(403);
    return c.json({ error: error.message });
  }
});

export { signUpUser, signInUser };
