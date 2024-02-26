import postgres from "postgres";
import { asyncLocalStorage } from "./asyncLocalStorage";

export type GlobalObject = {
  sql: postgres.Sql;
};

export const globalObject = asyncLocalStorage<GlobalObject>();

export const getSQL = () => globalObject.get("sql");
