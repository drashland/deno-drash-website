import { Line } from "../../../../../line/mod.ts";
import { ReadSubcommand, WriteSubcommand } from "./subcommands.ts";

const cli = new Line({
  command: "fm",
  name: "File Manager",
  description: "Manage your files (e.g., read, write)",
  subcommands: [
    ReadSubcommand,
    WriteSubcommand,
  ],
  version: "v1.0.0",
});

cli.run();
