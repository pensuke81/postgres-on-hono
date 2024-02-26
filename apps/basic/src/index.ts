import { Hono } from "hono";
import postgres from "postgres";

const getData = async (sql: postgres.Sql) => {
  const start = performance.now();
  const result = await sql`SELECT * FROM periodic_table limit 50`;
  const end = performance.now();
  console.info(`${end - start}ms`);

  return result;
};

const getDataAndReturnTime = async (sql: postgres.Sql) => {
  const result: string[] = [];
  for (let i = 0; i < 5; i++) {
    const start = performance.now();
    await sql`SELECT * FROM periodic_table limit 50`;
    const end = performance.now();
    result.push(`${end - start}ms`);
  }

  return result.join(", ");
};

export default new Hono<{
  Bindings: {
    DATABASE_URL: string;
    DATABASE_URL_CLOUDSQL: string;
    HYPERDRIVE: Hyperdrive;
    HYPERDRIVE_CACHED: Hyperdrive;
    DATABASE_URL_SUPABASE: string;
    DATABASE_URL_NEON: string;
  };
}>()
  .get("/", async (c) => {
    const urls = [
      "/cloudsql",
      "/hyperdrive",
      "/hyperdrive-cached",
      "/supabase",
      "/neon",
    ];
    return c.html(
      urls.map((url) => `<a href="${url}">${url}</a>`).join("<br>"),
    );
  })
  .get("/cloudsql", async (c) => {
    const sql = postgres(c.env.DATABASE_URL_CLOUDSQL);

    return c.text(await getDataAndReturnTime(sql));
  })
  .get("/hyperdrive", async (c) => {
    const sql = postgres(c.env.HYPERDRIVE.connectionString);

    return c.text(await getDataAndReturnTime(sql));
  })
  .get("/hyperdrive-cached", async (c) => {
    const sql = postgres(c.env.HYPERDRIVE_CACHED.connectionString);

    return c.text(await getDataAndReturnTime(sql));
  })
  .get("/supabase", async (c) => {
    const sql = postgres(c.env.DATABASE_URL_SUPABASE);

    return c.text(await getDataAndReturnTime(sql));
  })
  .get("/neon", async (c) => {
    const sql = postgres(c.env.DATABASE_URL_NEON);

    return c.text(await getDataAndReturnTime(sql));
  });
