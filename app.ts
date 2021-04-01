import { server } from "./server.ts";

await server.run({
  hostname: "0.0.0.0",
  port: 1445,
});

console.log(`Running server on http://${server.hostname}:${server.port}`);
