<script>
const title = "Creating An Advanced CLI";
const subtitle = "Part 3: Creating The Option";
const baseUri = "/advanced-tutorials/creating-an-advanced-cli";

export const resource = {
    paths: ["/advanced-tutorials/creating-an-advanced-cli/part-3"],
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="3" :parts="4")
  hr
  h2-hash Before You Get Started
  p Now that you have your subcommands set up, you will be adding some extra functionality to one of your subcommands by giving it an option.
  p In this tutorial part, you will add <code>--output-encoding</code> as an option to your <code>read</code> subcommand. This option will allow you to use your <code>read</code> subcommand and have it read the contents of a file and output the contents in an encoding of your choice.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     ▾ options/
      |         output_encoding_option.ts
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
      p Create the <code>OutputEncodingOption</code> class.
      code-block(title="/path/to/your/project/options/output_encoding_option.ts" language="typescript")
        | import { SubcommandOption } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
        |
        | export class OutputEncodingOption extends SubcommandOption {
        |   public name = "--output-encoding";
        |   public description = "Specify the output encoding.";
        | }
    li
      p Add <code>OutputEncodingOption</code> as an option to <code>ReadSubcommand</code>.
      code-block(title="/path/to/your/project/subcommands/read_subcommand.ts" language="typescript" line_highlight="9-11")
        | import { Subcommand } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
        | import { OutputEncodingOption } from "../options/output_encoding_option.ts";
        |
        | export class ReadSubcommand extends Subcommand {
        |   public signature = "read [source]";
        |
        |   public description = "Read a file.";
        |
        |   public options = [
        |     OutputEncodingOption,
        |   ];
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
      p Modify <code>ReadSubcommand</code> to handle the <code>--output-encoding</code> when it is specified.
      code-block(title="/path/to/your/project/subcommands/read_subcommand.ts" language="typescript" line_highlight="23")
        | import { Subcommand } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
        | import { OutputEncodingOption } from "../options/output_encoding_option.ts";
        |
        | export class ReadSubcommand extends Subcommand {
        |   public signature = "read [source]";
        |
        |   public description = "Read a file.";
        |
        |   public options = [
        |     OutputEncodingOption,
        |   ];
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
        |       const encoding = this.getOptionValue("--output-encoding") ?? "UTF-8";
        |       const decoder = new TextDecoder(encoding);
        |       const data = await Deno.readFile(source);
        |       console.log(decoder.decode(data));
        |     } catch (error) {
        |       console.log(`Failed to read '${source}'.`);
        |       console.log(error);
        |     }
        |   }
        | }
  hr
  h2-hash Verification
  ol
    li
      p Reinstall your CLI so that it has your newly created option.
      code-block(language="shell" :header="false")
        | $ deno install --allow-read --allow-write -f --name fm cli.ts
    li
      p Check that your <code>read</code> subcommand has the <code>--output-encoding</code> option.
      code-block(language="shell" :header="false")
        | $ fm read
      p You should see the following:
      code-block(language="text" :header="false")
        | USAGE
        |
        |     fm read [source] [deno flags] [options]
        |
        | OPTIONS
        |
        |     --output-encoding
        |         Specify the output encoding.
    li
      p Create a new file.
      code-block(language="shell" :header="false")
        | $ fm write test.txt hello
    li
      p Check that your <code>read</code> subcommand uses UTF-8 if no option is specified.
      code-block(language="shell" :header="false")
        | $ fm read test.txt
      p You should see the following:
      code-block(language="text" :header="false")
        | hello
    li
      p Check that your <code>--output-encoding</code> option works with UTF-8.
      code-block(language="shell" :header="false")
        | $ fm read test.txt --output-encoding "UTF-8"
      p You should see the following:
      code-block(language="text" :header="false")
        | hello
    li
      p Check that your <code>--output-encoding</code> option fails when an invalid encoding is specified.
      code-block(language="shell" :header="false")
        | $ fm read test.txt --output-encoding "zoom!"
      p You should see something similar to the following:
      code-block(language="text" :header="false")
        | Failed to read 'test.txt'.
        | RangeError: The encoding label provided ('zoom!') is invalid.
        |     at new TextDecoder (deno:op_crates/web/08_text_encoding.js:4095:15)
        |     at ReadSubcommand.handle (file:///subcommands/read_subcommand.ts:24:23)
        |     at file:///cli.ts:20:4
    li
      p Clean up your project directory.
      code-block(language="shell" :header="false")
        | $ fm delete test.txt
  div-alert-finished-tutorial-series
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="3" :parts="3")
</template>
