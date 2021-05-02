import { Line } from "../../../../line/mod.ts";

const cli = new Line({
  command: "fm",
  name: "File Manager",
  description: "Manage your files (e.g., read, write, delete)",
  subcommands: [],
  version: "v1.0.0",
});

cli.run();
