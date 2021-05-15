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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="2" :parts="3")
  hr
  h2-hash Before You Get Started
  p Now that you have your main command set up, you will need to create your four subcommands. Line is a very object-oriented module, so your subcommands will be classes. Specifically, they will be derived classes of Line's <code>Subcommand</code> class.
  p In this tutorial part, you will create four subcommands. These subcommands will offer the functionality for your CLI. They are:
  ul
    li
      p <code>CopySubcommand</code>: This will be in charge of copying files from one location to another.
    li
      p <code>DeleteSubcommand</code>: This will be in charge of deleting files.
    li
      p <code>ReadSubcommand</code>: This will be in charge of reading files.
    li
      p <code>WriteSubcommand</code>: This will be in charge of writing files.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     ▾ subcommands/
      |         copy_subcommand.ts
      |         delete_subcommand.ts
      |         read_subcommand.ts
      |         write_subcommand.ts
      |     cli.ts
  hr
  h2-hash Steps
  ol
    li
      p Create the <code>CopySubcommand</code> class.
      code-block(title="/path/to/your/project/subcommands/copy_subcommand.ts" language="typescript")
        | import { Subcommand } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
        |
        | export class CopySubcommand extends Subcommand {
        |   public signature = "copy [source] [destination]";
        |
        |   public description = "Copy a file from one location to another.";
        |
        |   public options = [];
        |
        |   public async handle(): Promise&lt;void&gt; {
        |     const source = this.getArgumentValue("source"); // matches [source] in the signature
        |     const destination = this.getArgumentValue("destination"); // matches [destination] in the signature
        |
        |     // Show the help if any of the arguments are missing
        |     if (!source || !destination) {
        |       this.showHelp();
        |       return;
        |     }
        |
        |     try {
        |       await Deno.copyFile(source, destination);
        |       console.log(`Successfully copied '${source}' to '${destination}'.`);
        |     } catch (error) {
        |       console.log(error);
        |     }
        |   }
        | }
    li
      p Create the <code>DeleteSubcommand</code> class.
      code-block(title="/path/to/your/project/subcommands/delete_subcommand.ts" language="typescript")
        | import { Subcommand } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
        |
        | export class DeleteSubcommand extends Subcommand {
        |   public signature = "delete [source]";
        |
        |   public description = "Delete a file.";
        |
        |   public options = [];
        |
        |   public async handle(): Promise&lt;void&gt; {
        |     const source = this.getArgumentValue("source"); // matches [source] in the signature
        |
        |     // Show the help if source is missing
        |     if (!source) {
        |       this.showHelp();
        |       return;
        |     }
        |
        |     try {
        |       await Deno.remove(source);
        |       console.log(`Successfully deleted '${source}'.`);
        |     } catch (error) {
        |       console.log(`Failed to delete '${source}'.`);
        |       console.log(error);
        |     }
        |   }
        | }
    li
      p Create the <code>ReadSubcommand</code> class.
      code-block(title="/path/to/your/project/subcommands/read_subcommand.ts" language="typescript")
        | import { Subcommand } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
        |
        | export class ReadSubcommand extends Subcommand {
        |   public signature = "read [source]";
        |
        |   public description = "Read a file.";
        |
        |   public options = [];
        |
        |   public async handle(): Promise&lt;void&gt; {
        |     const source = this.getArgumentValue("source"); // matches [source] in the signature
        |
        |     // Show the help if the source is missing
        |     if (!source) {
        |       this.showHelp();
        |       return;
        |     }
        |
        |     try {
        |       const decoder = new TextDecoder("utf-8");
        |       const data = await Deno.readFile(source);
        |       console.log(decoder.decode(data));
        |     } catch (error) {
        |       console.log(`Failed to read '${source}'.`);
        |       console.log(error);
        |     }
        |   }
        | }
    li
      p Create the <code>WriteSubcommand</code> class.
      code-block(title="/path/to/your/project/subcommands/write_subcommand.ts" language="typescript")
        | export class WriteSubcommand extends Subcommand {
        |   public signature = "write [source] [text]";
        |
        |   public description = "Write text to a file.";
        |
        |   public options = [];
        |
        |   public async handle(): Promise&lt;void&gt; {
        |     const source = this.getArgumentValue("source"); // matches [source] in the signature
        |     const text = this.getArgumentValue("text"); // matches [text] in the signature
        |
        |     // Show the help if any of the arguments are missing
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
  hr
  h2-hash Verification
  ol
    li
      p Install your CLI.
      code-block(language="shell" :header="false")
        | $ deno install --allow-read --allow-write --name fm cli.ts
    li
      p Run your CLI.
      code-block(language="shell" :header="false")
        | $ fm
      p You should see the following:
      code-block(language="text" :header="false")
        | File Manager - Read, write, copy, and delete files.
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
        |     copy
        |         Copy a file from one location to another.
        |     delete
        |         Delete a file.
        |     read
        |         Read a file.
        |     write
        |         Write text to a file.
    li
      p Check that your <code>write</code> subcommand works.
      code-block(language="text" :header="false")
        | $ fm write test.txt "hello"
    li
      p Check that your <code>read</code> subcommand works by reading the file you just wrote.
      code-block(language="text" :header="false")
        | $ fm read test.txt
      p You should see the following:
      code-block(language="text" :header="false")
        | hello
    li
      p Check that your <code>copy</code> subcommand works by copying the file you just wrote.
      code-block(language="text" :header="false")
        | $ fm copy test.txt test_copy.txt
        | $ fm read test_copy.txt
      p You should see the following:
      code-block(language="text" :header="false")
        | hello
    li
      p Check that your <code>delete</code> subcommand works by deleting the files you wrote.
      code-block(language="text" :header="false")
        | $ fm delete test.txt
        | $ fm delete test_copy.txt
      p Try to read the files after deleting them.
      code-block(language="text" :header="false")
        | $ fm read test.txt
        | $ fm read test_copy.txt
      p For each <code>read</code> performed, you should see something similar to the following:
      code-block(language="text" :header="false")
        | Failed to read '{filename}.txt'.
        | NotFound: No such file or directory (os error 2)
        |     at unwrapOpResult (deno:core/core.js:99:13)
        |     at async open (deno:runtime/js/40_files.js:46:17)
        |     at async Object.readFile (deno:runtime/js/40_read_file.js:19:18)
        |     at async ReadSubcommand.handle (file:///subcommands/read_subcommand.ts:21:20)
    li
      p Check that your help menus for your subcommands are set up properly.
      p First, check the <code>copy</code> subcommand help menu.
      code-block(language="text" :header="false")
        | $ fm copy
      p You should see the following:
      code-block(language="text" :header="false")
        | USAGE
        |
        |     fm copy [source] [destination] [deno flags] [options]
      p Now check all other subcommands: 
      code-block(language="text" :header="false")
        | $ fm [subcommand here]
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="2" :parts="3")
</template>
