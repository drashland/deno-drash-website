import { Line } from "../../../../../line/mod.ts";
import { GreetSubcommand } from "./subcommands.ts";

const cli = new Line({
  command: "greeter",
  name: "Greeter",
  description: "Greet users.",
  subcommands: [
    GreetSubcommand,
  ],
  version: "v1.0.0",
});

cli.run();
