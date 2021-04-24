<script>
const title = "Creating An Advanced CLI";
const subtitle = "Part 2: Creating The Subcommands";
const baseUri = "/advanced-tutorials/creating-an-advanced-cli";

export const resource = {
    paths: ["/advanced-tutorials/creating-an-advanced-cli/part-2"],
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="2" :parts="4")
  hr
  h2-hash Before You Get Started
  p Now that you have your command set up, you will need to create your subcommands. Line is a very object orientated focussed module, so your command and subcommand code will be classes.
  p You will create 2 subcommands: read and write. These will offer the functionality for your tool.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |   ▾ subcommands/
      |       read_command.ts
      |       write_command.ts
      |     cli.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your read command file.
      p
        code-block(title="/path/to/your/project/subcommands/read.ts" language="typescript")
          | import { Subcommand } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
          |
          | const decoder = new TextDecoder()
          |
          | export class ReadSubcommand extends Subcommand {
          |   public signature = "read [file]";
          |   public description = "Display the contents of a file.";
          |   public handle(): void {
          |     const file = this.getArgumentValue("file");
          |     if (!file) {
          |       this.showHelp();
          |       return;
          |     }
          |     const contents = Deno.readFileSync(file);
          |     console.log(decoder.decode(contents));
          |   }
          | }
      p You have now created your first subcommand. This subcommand will attempt to read the given file, and display the output to the user. If no arugment was provided (the filename), then it will display the help output specific to this subcommand.
    li
      p Now create your write subcommand.
      p
        code-block(title="/path/to/your/project/subcommands/write.ts" language="typescript" line_highlight="2,8")
          | import { Subcommand } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
          | import { OverwriteOption } from "../options/overwrite.ts";
          |
          | export class WriteSubcommand extends Subcommand {
          |   public signature = "write [src] [dst]";
          |   public description = "Write the contents of one file to another.";
          |   public options = [
          |     OverwriteOption
          |   ]
          |   public handle(): void {
          |     const source = this.getArgumentValue("src");
          |     const destination = this.getArgumentValue("dst")
          |     if (!source || !destination) {
          |       this.showHelp();
          |       return;
          |     }
          |     try {
          |       Deno.statSync(destination) // Will throw an error if file doesnt exist
          |       if (!this.getOptionValue("--overwrite")) {
          |         return console.error(`${destination} already exists! Try use the --overwrite flag to overwrite it.`);
          |       }
          |     } catch (_err) {
          |       // Do nothing, carry on...
          |     }
          |     const contents = Deno.readFileSync(source);
          |     Deno.writeFileSync(destination, contents)
          |   }
          | }
      p With your write subcommand, it will handle two parameters: a source and destination. If one isn't defined, your code will display the help output specific to this subcommand. If they are both defined, your subcommand will attempt to write the contents of one file, into another.
      p You will notice that your subcommand is also using a <code>OverwriteOption</code>. You will be creating this in the next part.
  hr
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="2" :parts="4")
</template>
