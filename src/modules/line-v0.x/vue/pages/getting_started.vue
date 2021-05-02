<script>
import H2Hash from "/assets/common/vue/h2_hash.vue";
import CodeBlock from "/assets/common/vue/code_block.vue";
import CodeBlockImport from "/assets/common/vue/code_block_import.vue";
import IntroductionHeader from "/assets/common/vue/introduction_header.vue";

export const resource = {
  paths: ["/", "/introduction"],
  meta: {
    title: "Introduction",
  }
}

export default {
  components: {
    H2Hash,
    CodeBlock,
    CodeBlockImport,
    IntroductionHeader,
  },
  data() {
    return {
    };
  }
}
</script>

<template lang="pug">
div
  introduction-header(heading="Line" description="A command-line interface (CLI) framework")
  div.flex.mb-5
    a(href="https://github.com/drashland/line/releases" target="_BLANK")
      img.mr-1(alt="Latest Line Release" src="https://img.shields.io/github/release/drashland/line.svg?color=brightgreen&label=Latest" width="auto" height="20")
    a(href="https://github.com/drashland/line/actions" target="_BLANK")
      img.mr-1(alt="Line CI" src="https://img.shields.io/github/workflow/status/drashland/line/master?label=CI" width="auto" height="20")
    a(href="https://discord.gg/SgejNXq" target="_BLANK")
      img.mr-1(alt="Drash Land Discord" src="https://img.shields.io/badge/Chat-on%20Discord-blue")
    a(href="https://twitter.com/drash_land" target="_BLANK")
      img.mr-1(alt="Drash Land Twitter" src="https://img.shields.io/twitter/url?label=%40drash_land&style=social&url=https%3A%2F%2Ftwitter.com%2Fdrash_land" width="auto" height="20")
    //a(href="https://rb.gy/vxmeed" target="_BLANK")
      img(alt="Line YouTube" src="https://img.shields.io/badge/Tutorials-YouTube-red" width="auto" height="20")
  div
    hr
    h2-hash Quickstart
    ol
      li
        p Create your CLI that will read and write a given file.
        code-block(title="app.ts" language="typescript")
          | import { Line, Subcommand } from "https://deno.land/x/line/mod.ts";
          |
          | const decoder = new TextDecoder();
          | const encoder = new TextEncoder();
          |
          | class Read extends Subcommand {
          |   public signature = "read [file]";
          |   public description = "Read a file.";
          |
          |   public handle(): void { // can also be async
          |     const file = this.getArgumentValue("file");
          |     if (!file) {
          |       return console.log("File not specified");
          |     }
          |     const contents = Deno.readFileSync(file);
          |     console.log(decoder.decode(contents));
          |   }
          | }
          |
          | class Write extends Subcommand {
          |   public signature = "write [file] [contents]";
          |   public description = "Write contents to a file.";
          |
          |   public handle(): void { // can also be async
          |     const file = this.getArgumentValue("file");
          |     if (!file) {
          |       return console.log("File not specified");
          |     }
          |     const contents = this.getArgumentValue("contents");
          |     if (!contents) {
          |       return console.log("Contents not specified");
          |     }
          |     try {
          |       Deno.writeFileSync(file, encoder.encode(contents));
          |       console.log("Successfully wrote file.");
          |     } catch (error) {
          |       console.log(error);
          |     }
          |   }
          | }
          |
          | const cli = new Line({
          |   command: "fm",
          |   name: "File Manager",
          |   description: "A file manager.",
          |   version: "v1.0.0",
          |   subcommands: [
          |     Read,
          |     Write,
          |   ],
          | });
          |
          | cli.run();
        p The classes act as your commands (e.g., <code>fm read</code>) and the <code>cli</code> variable acts as your main CLI tool. <code>cli</code> will handle displaying your CLI's help messages, version, and other pertinent information to make your CLI easy to navigate and use.
      li
        p Install your CLI as a binary under the name <code>fm</code>.
        code-block(title="Terminal" language="bash")
          | $ deno install --allow-read --allow-write --name fm app.ts
        p The <code>--name</code> option value is what will allow your CLI to install as the <code>fm</code> command. Make sure the <code>command</code> config when you instantiate <code>Line</code> matches the <code>--name</code> option value so that your users do not get confused.
      li
        p Run your CLI.
        code-block(title="Terminal" language="shell")
          | $ fm
        p You should see the following:
        code-block(title="Terminal" language="text")
          | File Manager - A file manager.
          |
          | USAGE
          |
          |     fm [option | [[subcommand] [args] [deno flags] [options]]
          |
          | OPTIONS
          |
          |     -h, --help    Show this menu.
          |     -v, --version Show this CLI's version.
          |
          | SUBCOMMANDS
          |
          |     read
          |         Read a file.
          |     write
          |         Write contents to a file.
    hr
    h2-hash Importing
    code-block-import(name="Line" repo="line" :version="$conf.line.latest_version")
    hr
    h2-hash Features
    ul
      li
        p Zero 3rd party dependencies
      li
        p Scalable for large scale CLIs
      li
        p Recursive help menus
</template>
