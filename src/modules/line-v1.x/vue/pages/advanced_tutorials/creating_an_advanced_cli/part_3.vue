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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="2" :parts="4")
  hr
  h2-hash Before You Get Started
  p Now that you have your subcommands set up, you will need to create your option for your write subcommand.
  p You will create 1 option, it will allow users to add an option on whether the File Manager is allowed to overwrite existing file when using the write subcommand.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |   ▾ subcommands/
      |       read_command.ts
      |       write_command.ts
      |   ▾ options/
      |       overwrite_option.ts
      |     cli.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your overwrite option file.
      p
        code-block(title="/path/to/your/project/options/overwrite.ts" language="typescript")
          | import { SubcommandOption } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
          |
          | const decoder = new TextDecoder()
          |
          | export class OverwriteOption extends SubcommandOption {
          |   public name = "--overwrite";
          |   public description = "Allow the destination file to be overwritten";
          | }
      p You have now created your first option! This option will be used with the write subcommand, so a user can pass it as a flag should they want the source file to overwrite the destination file.
  hr
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="2" :parts="4")
</template>
