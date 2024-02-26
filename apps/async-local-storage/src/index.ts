import { Hono } from "hono";
import postgres from "postgres";
import { getSQL, globalObject } from "./globalObject";

type Env = { Bindings: { DATABASE_URL: string } };

export default new Hono<Env>()
  .use(globalObject.store<Env>((c) => ({ sql: postgres(c.env.DATABASE_URL) })))
  .get("/", async (c) => {
    const sql = getSQL();
    const result = await sql`SELECT * FROM periodic_table`;
    return c.json(result);
  });
