import { gitMergeMainInto, run } from "./scripts.ts";

console.log("Merging main into all branches");

await run(["git", "checkout", "main"]);
await run(["git", "pull"]);

await gitMergeMainInto("dmm-v1.x");
await gitMergeMainInto("drash-v1.x");
await gitMergeMainInto("rhum-v1.x");
await gitMergeMainInto("wocket-v0.x");

await run(["git", "checkout", "main"]);
