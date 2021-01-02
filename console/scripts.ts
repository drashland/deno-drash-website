const decoder = new TextDecoder();

/**
 * Build documentation pages for the specified branch.
 *
 * @param parentBranch - One of the parent branches (e.g., rhum-v1.x).
 */
export async function buildDocs(parentBranch = "") {
  if (parentBranch != "") {
    await run(["git", "checkout", parentBranch]);
  }
  await run(["console/build_docs", parentBranch]);
}

/**
 * Merge main into the specified branch
 *
 * @param parentBranch - One of the parent branches (e.g., rhum-v1.x).
 */
export async function gitMergeMainInto(parentBranch: string) {
  await run(["git", "checkout", parentBranch]);
  await run(
    ["git", "merge", "--no-ff", "main", "-m", "update with main branch"],
  );
  await run(["git", "push"]);
}

/**
 * Pull the latest change from the specified branch.
 *
 * @param branch - The branch to pull.
 */
export async function gitPullLatest(branch: string) {
  await run(["git", "checkout", branch]);
  await run(["git", "pull"]);
}

/**
 * Run a command.
 *
 * @param command - The command in array format (e.g., ["git", "pull"]).
 */
export async function run(command: string[]) {
  const p = Deno.run({
    cmd: command,
    stderr: "piped",
  });

  const status = await p.status();

  if (status.code === 1) {
    console.log(decoder.decode(await p.stderrOutput()));
  }

  p.close();
}
