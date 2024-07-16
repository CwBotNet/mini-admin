import { createFactory } from "hono/factory";

type Env = {
  DATABASE_URL: string;
};

const factory = createFactory();

enum statusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  Ok = 200,
}

export { factory, Env, statusCode };
