import { buildDocs, run } from "./scripts.ts";

const args = Deno.args.slice();
const branch = args[0];

console.log(`Building docs for ${branch}`);

await run(["npm", "install"]);

await buildDocs(branch);
