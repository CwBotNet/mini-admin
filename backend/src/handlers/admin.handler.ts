import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { factory, statusCode } from "../utils";
import { setCookie } from "hono/cookie";

const createMiniAdmin = factory.createHandlers(async (c) => {
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

    const miniAdmin = await prisma.miniAdminDetails.create({
      data: {
        name: body.name,
        email: body.email,
        role: body.role,
      },
    });

    if (!miniAdmin) {
      c.status(statusCode.INTERNAL_SERVER_ERROR);
      return c.json({
        error: "mini admin not created",
      });
    }

    return c.json(
      {
        message: "mini admin created successfully",
        data: miniAdmin,
      },
      statusCode.Ok
    );
  } catch (e) {
    console.log(e);
    c.status(statusCode.INTERNAL_SERVER_ERROR);
  }
});

const getMiniAdmin = factory.createHandlers(async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    if (!prisma) {
      return c.json({
        error: "prisma client connection faild not found",
      });
    }

    const miniAdmin = await prisma.miniAdminDetails.findMany({});

    if (!miniAdmin) {
      c.status(statusCode.NOT_FOUND);
      return c.json({
        error: "mini admin not found",
      });
    }

    return c.json(
      {
        data: miniAdmin,
        succeess: true,
      },
      statusCode.Ok
    );
  } catch (error) {}
});

const getMiniAdminById = factory.createHandlers(async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    if (!prisma) {
      return c.json({
        error: "prisma client connection faild not found",
      });
    }

    const miniAdmin = await prisma.miniAdminDetails.findUnique({
      where: {
        id: id,
      },
    });

    if (!miniAdmin) {
      c.status(statusCode.NOT_FOUND);
      return c.json({
        error: "mini admin not found",
      });
    }

    return c.json(
      {
        data: miniAdmin,
      },
      statusCode.Ok
    );
  } catch (error) {
    console.log(error);
    c.status(statusCode.INTERNAL_SERVER_ERROR);
    return c.json({ error: error });
  }
});

const updateMiniAdmin = factory.createHandlers(async (c) => {
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

    const miniAdminUpdate = await prisma.miniAdminDetails.update({
      where: {
        id: body.id,
      },
      data: {
        name: body?.name,
        email: body?.email,
        role: body.role,
      },
    });

    if (!miniAdminUpdate) {
      c.status(statusCode.NOT_FOUND);
      return c.json({
        error: "mini admin not found",
      });
    }

    return c.json({
      message: "mini admin updated successfully",
      data: miniAdminUpdate,
    });
  } catch (error) {
    console.log(error);
    c.status(statusCode.INTERNAL_SERVER_ERROR);
    return c.json({ error: error });
  }
});

const deleteMiniAdmin = factory.createHandlers(async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    if (!prisma) {
      return c.json({
        error: "prisma client connection faild not found",
      });
    }

    const id = c.req.param("id");

    const miniAdminDelete = await prisma.miniAdminDetails.delete({
      where: {
        id: id,
      },
    });

    if (!miniAdminDelete) {
      c.status(statusCode.NOT_FOUND);
      return c.json({
        error: "mini admin not found",
      });
    }

    return c.json(
      {
        message: "mini admin deleted successfully",
      },
      statusCode.Ok
    );
  } catch (error) {}
});

const logOut = factory.createHandlers(async (c) => {
  try {
    setCookie(c, "token", "");
    return c.json({ message: "logout successfully" }, statusCode.Ok);
  } catch (e: any) {
    c.status(statusCode.INTERNAL_SERVER_ERROR);
    return c.json({ error: e.message });
  }
});

export {
  createMiniAdmin,
  deleteMiniAdmin,
  getMiniAdmin,
  updateMiniAdmin,
  getMiniAdminById,
  logOut,
};
