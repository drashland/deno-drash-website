import { gitPullLatest, run } from "./scripts.ts";

console.log("Pulling latest changes from all branches");

await gitPullLatest("dmm-v1.x");
await gitPullLatest("drash-v1.x");
await gitPullLatest("rhum-v1.x");
await gitPullLatest("wocket-v1.x");

await run(["git", "checkout", "main"]);
