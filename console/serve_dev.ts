import { run } from "./scripts.ts";

const args = Deno.args.slice();

const branch = args[0];
const moduleName = branch.split("-")[0];
const moduleVersion = branch.split("-")[1];

await run(["node", "console/compile_vue_routes.js", args[0]]);

await run(["pkill", "-f", "drash_website_server.ts"]);

await run(["deno", "run", "-A", "drash_website_server.ts"]);
