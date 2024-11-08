import { serve } from "@hono/node-server";
import { app } from "./interface-adapters/routes";

const port = 3000;

serve({
  fetch: app.fetch,
  port: port,
});

console.log(`🚀 Server running at http://localhost:${port}/api`);
