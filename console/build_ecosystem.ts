import { decoder, encoder } from "../deps.ts";
import { run } from "./scripts.ts";

console.log("Building ecosystem...");

console.log("Installing npm dependencies...");
await run(["npm", "install"]);

console.log("Building node-sass for current environment...");
await run(["npm", "rebuild", "node-sass"]);

// Create the PM2 ecosystem file so that we can run `pm2 start` after this
// script is done running
console.log("Creating ecosystem.config.js for PM2...");
let configs = decoder.decode(await Deno.readFile("ecosystem.config.sample.js"));
configs = configs.replace(/\/path\/to\/website/g, Deno.cwd());
await Deno.writeFile("./ecosystem.config.js", encoder.encode(configs));