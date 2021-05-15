<script>
const title = "Creating An Advanced CLI";
const subtitle = "Part 1: Create Your Command";
const baseUri = "/advanced-tutorials/creating-an-advanced-cli";

export const resource = {
    paths: ["/advanced-tutorials/creating-an-advanced-cli/part-1"],
    meta: {
      title,
      subtitle,
    }
}

export default {
  data() {
    return {
      base_url: this.$conf.line.base_url,
      base_uri: baseUri,
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
      ],
      title,
      subtitle,
    };
  },
}
</script>

<template lang="pug">
page(
  :base_url="base_url",
  :base_uri="base_uri",
  :subtitle="subtitle"
  :title="title"
  :toc="toc"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="1" :parts="3")
  hr
  h2-hash Before You Get Started
  p First, you are going to write the bread and butter for your command line tool. This starts with creating the main command: <code>fm</code>.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     cli.ts
  hr
  h2-hash Steps
  ol
    li
      p Create the <code>cli.ts</code> file.
      p
        code-block(title="/path/to/your/project/cli.ts" language="typescript" line_highlight="2-5,13-16")
          | import { Line } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
          | import { CopySubcommand } from "./subcommands/write_subcommand.ts";
          | import { DeleteSubcommand } from "./subcommands/delete_subcommand.ts";
          | import { ReadSubcommand } from "./subcommands/read_subcommand.ts";
          | import { WriteSubcommand } from "./subcommands/write_subcommand.ts";
          | 
          | const fm = new Line({
          |   command: "fm",
          |   name: "File Manager",
          |   description: "Read, write, copy, and delete files.",
          |   version: "v1.0.0",
          |   subcommands: [
          |     CopySubcommand,
          |     DeleteSubcommand,
          |     ReadSubcommand,
          |     WriteSubcommand,
          |   ],
          | });
          |
          | fm.run();
        p You will notice in the highlighted lines that there are four subcommands. You will create those in the next tutorial part.
        p Here, your CLI will have the following setup:
        ul
          li
            p Your CLI's main command is <code>fm</code>. This is what you will type in the terminal to run your command. It is also what Line will use when displaying your help menus.
          li
            p Your CLI's name is "File Manager". This is used in the help menu via the <code>--help</code> option.
          li
            p Your CLI's description is "Read, write, copy, and delete files." This is used in the <code>--help</code> option.
          li
            p Your CLI's version is <code>v1.0.0</code>. This is used in the <code>--help</code> option and the <code>--version</code> option.
          li
            p Your command will have four subcommands:
          ul
            li
              p <code>CopySubcommand</code>
            li
              p <code>DeleteSubcommand</code>
            li
              p <code>ReadSubcommand</code>
            li
              p <code>WriteSubcommand</code>
  hr
  h2-hash Verification
  p There are no verification steps for this tutorial part.
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="1" :parts="3")
</template>
