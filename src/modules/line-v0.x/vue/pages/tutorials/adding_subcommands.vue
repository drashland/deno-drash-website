<script>
export const resource = {
  paths: ["/tutorials/adding-subcommands"],
  meta: {
    title: "Adding Subcommands",
  }
}

export default {
  data() {
    return {
      title: resource.meta.title,
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
      ]
    };
  },
}
</script>

<template lang="pug">
page(
  :base_url="this.$conf.line.base_url"
  :title="title"
  :toc="toc"
)
  h2-hash Before You Get Started
  p A CLI would not be complete without subcommands. Line allows you to add as many subcommands to your CLI as you wish. Subcommands are responsible for adding functionality to your CLI and processing user input.
  p Simply put, subcommands are classes (with a few required properties and methods) that Line registers and instantiates during runtime. If user input matches a signature of a registered subcommand, then Line will use that subcommand to process the user input.
  p When you write a subcommand, it is in the form of a class and must extend Line's <code>Subcommand</code> class. The following class members are required in your subcommand class(es):
  ul
    li
      p <code>signature</code>
      p This property will explain to users how the subcommand is to be used. This signature is what will be displayed in the help menus and is what Line uses to match user input.
    li
      p <code>description</code>
      p This property will explain to users the purpose of the subcommand and what it does. This description is what will be displayed in the help menus.
    li
      p <code>options</code>
      p This property holds an array of subcommand options (also known as "flags"). For more information on adding options to subcommands, please see the <a :href="$conf.line.base_url + '/#/tutorials/adding-options'">Adding Options</a> tutorial.
    li
      p <code>handle()</code>
      p This method is the bread and butter of the subcommand. This method "handles" user input.
  p In this tutorial, you will create two subcommands:
  ul
    li <code>ReadSubcommand</code>: This will be in charge of reading files.
    li <code>WriteSubcommand</code>: This will be in charge of writing files.
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts
    |   subcommands.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your subcommand classes and export them.
      code-block(title="subcommands.ts" language="typescript")
        | import { Subcommand } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
        |
        | /**
        |  * Read files.
        |  */
        | export class ReadSubcommand extends Subcommand {
        |   public signature = "read [source]";
        |
        |   public description = "Read the contents of a file.";
        |
        |   public options = [];
        |
        |   public handle(): void {
        |     const source = this.getArgumentValue("source"); // matches [source] in the signature
        |
        |     if (!source) {
        |       this.showHelp();
        |       return;
        |     }
        |
        |     const contents = new TextDecoder().decode(Deno.readFileSync(source));
        |     console.log(contents);
        |   }
        | }
        |
        | /**
        |  * Write files.
        |  */
        | export class WriteSubcommand extends Subcommand {
        |   public signature = "write [source] [text]";
        |
        |   public description = "Write text to a file.";
        |
        |   public options = [];
        |
        |   public handle(): void {
        |     const source = this.getArgumentValue("source"); // matches [source] in the signature
        |     const text = this.getArgumentValue("text"); // matches [text] in the signature
        |
        |     if (!source || !text) {
        |       this.showHelp();
        |       return;
        |     }
        |
        |     try {
        |       Deno.writeFileSync(source, new TextEncoder().encode(text));
        |       console.log(`Successfully wrote '${source}'.`);
        |     } catch (error) {
        |       console.log(`Failed to write '${source}'.`);
        |     }
        |   }
        | }
    li
      p Import your subcommands and add them to your CLI application.
      code-block(title="app.ts" language="typescript" line_highlight="8-11")
        | import { Line } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
        | import { ReadSubcommand, WriteSubcommand } from "./subcommands.ts";
        |
        | const cli = new Line({
        |   command: "fm",
        |   name: "File Manager",
        |   description: "Manage your files (e.g., read, write)",
        |   subcommands: [
        |     ReadSubcommand,
        |     WriteSubcommand,
        |   ],
        |   version: "v1.0.0",
        | });
        |
        | cli.run();
  hr
  h2-hash Verification
  ol
    li
      p Install your CLI.
      code-block(language="shell" :header="false")
        | $ deno install --allow-read --allow-write --name fm app.ts
    li
      p Run your CLI.
      code-block(language="shell" :header="false")
        | $ fm
      p You should see the following:
      code-block(language="text" :header="false")
        | File Manager - Manage your files (e.g., read, write)
        |
        | USAGE
        |
        |     fm [option | [[subcommand] [args] [deno flags] [options]]]
        |
        | OPTIONS
        |
        |     -h, --help    Show this menu.
        |     -v, --version Show this CLI's version.
        |
        | SUBCOMMANDS
        |
        |     read
        |         Read the contents of a file.
        |     write
        |         Write text to a file.
    li
      p Write a <code>hello.txt</code> file.
      code-block(language="shell" :header="false")
        | $ fm write hello.txt "Hello world"
      p You should see the following:
      code-block(language="text" :header="false")
        | Successfully wrote 'hello.txt'.
    li
      p Read the <code>hello.txt</code> file.
      code-block(language="shell" :header="false")
        | $ fm read hello.txt
      p You should see the following:
      code-block(language="text" :header="false")
        | Hello world
</template>
