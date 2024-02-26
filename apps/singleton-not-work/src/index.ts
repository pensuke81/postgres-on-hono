export type Env = {};

export let singleton: string;

/**
 * This will not work with "wrangler dev" because of the following error:
 * ✘ [ERROR] service core:user:singleton-not-work: Uncaught TypeError: Cannot initialize a dictionary with required members from an undefined or null value.
 * ✘ [ERROR] MiniflareCoreError [ERR_RUNTIME_FAILURE]: The Workers runtime failed to start. There is likely additional logging output above.
 *
 * But with "wrangler dev --remote" it works.
 */
export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    if (!singleton) {
      singleton = new Date().toISOString();
    }
    return new Response(singleton);
  },
};
