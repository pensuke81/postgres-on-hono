import { AsyncLocalStorage } from "node:async_hooks";
import { Context, Env } from "hono";
import { createMiddleware } from "hono/factory";

type Callback<T, E extends Env> = (c: Context<E>) => T;

const localStorage = new AsyncLocalStorage();

export const asyncLocalStorage = <T>() => ({
  store: <E extends Env = Env>(callback: Callback<T, E>) =>
    createMiddleware(async (c, next) => {
      const obj = callback(c);
      return localStorage.run(obj, next);
    }),
  get: <K extends keyof T>(key: K): T[K] => {
    const store = localStorage.getStore() as T;
    return store[key];
  },
});
