<script>
const title = "Creating An Advanced CLI";
const subtitle = "Part 1: Create Your Command";
const baseUri = "/advanced-tutorials/creating-an-advanced-cli";

export const resource = {
    paths: ["/advanced-tutorials/creating-an-advanced-clin/part-1"],
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="1" :parts="4")
  hr
  h2-hash Before You Get Started
  p First, you are going to write the bread and butter for your command line tool. This starts with creating the command.
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
        code-block(title="/path/to/your/project/cli.ts" language="typescript" line_highlight="2,3,11,12")
          | import { Line, Subcommand } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
          | import { WriteSubcommand } from "./subcommands/write.ts";
          | import { ReadSubcommand } from "./subcommands/read.ts";
          | 
          | const fm = new Line({
          |   command: "fm",
          |   name: "File Manager",
          |   description: "A file manager to handle reading and writing of files.",
          |   version: "v1.0.0",
          |   subcommands: [
          |     Read,
          |     Write,
          |   ],
          | });
        p You will notice that we have included 2 subcommands. You will create those in the next step.
        p Here, your CLI will have the following information:
        ul
          li The command will be "fm", which is used in the <code>--help</code> option.
          li The name will be "File Manager", which is used in the <code>--help</code> option.
          li The description will also be used in the <code>--help</code> option.
          li The version will be displayed in the <code>--version</code> option.
          li The command will have two subcommands
  hr
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="1" :parts="4")
</template>
