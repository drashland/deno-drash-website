<script>
export const resource = {
  paths: ["/tutorials/creating-clis"],
  meta: {
    title: "Creating CLIs",
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
  p In this tutorial, you will create a CLI using the <code>Line</code> class. The <code>Line</code> class requires a few configs:
  ul
    li
      p <code>name</code>
      p This is your CLI's name (e.g., "File Manager").
    li
      p <code>description</code>
      p This is your CLI's description (e.g., "A file manager.").
    li
      p <code>command</code>
      p This is the name of your command (e.g., <code>fm</code>) and is what users will type in the command line. This command <em>must</em> match the <code>--name</code> option value in the <code>deno install</code> command. See below where we have added the <code>^^^^^^^^^</code> characters:
      code-block(language="shell" :header="false")
        | $ deno install --allow-read --allow-write --name fm app.ts
        |                                           ^^^^^^^^^
      p Be sure to tell your users to use the <code>deno install</code> command correctly so that the command they type in the command line matches the command that shows up in your CLI's help menus.
    li
      p <code>subcommands</code>
      p This is where you define your CLI's subcommands. To learn how to add subcommands, please see the <a :href="$conf.line.base_url + '/#/tutorials/adding-subcommands'">Adding Subcommands</a> tutorial.
    li
      p <code>version</code>
      p This is your CLI's version (e.g., v1.0.0).
    p Putting all of the configs together to make a Line application looks like the following:
    code-block(language="typescript" :header="false")
      | const cli = new Line({
      |   command: "fm",
      |   name: "File Manager",
      |   description: "A file manager.",
      |   subcommands: [],
      |   version: "v1.0.0",
      | });
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your CLI application.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { Line } from "https://deno.land/x/line@{{ $conf.line.latest_version }}/mod.ts";
        |
        | const cli = new Line({
        |   command: "fm",
        |   name: "File Manager",
        |   description: "Manage your files (e.g., read, write, delete)",
        |   subcommands: [],
        |   version: "v1.0.0",
        | });
        |
        | cli.run();
      p You will notice <code>subcommands</code> is empty. Although we did not go over adding subcommands in this tutorial, you can learn how to add subcommands in the <a :href="$conf.line.base_url + '/#/tutorials/adding-subcommands'">Adding Subcommands</a> tutorial.
  hr
  h2-hash Verification
  ol
    li
      p Install your CLI.
      code-block(language="shell" :header="false")
        | $ deno install --allow-read --allow-write --name fm app.ts
      p Remember, your <code>command</code> config value should match the <code>--name</code> option value in the <code>deno install</code> command. Otherwise, your help menus will display your <code>command</code> config value when your actual command is not that value. This would be confusing to users.
    li
      p Run your CLI.
      code-block(language="shell" :header="false")
        | $ fm
      p You should see the following:
      code-block(language="shell" :header="false")
        | File Manager - Manage your files (e.g., read, write, delete)
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
      p Your <code>SUBCOMMANDS</code> section should be empty. This is expected since we did not go over adding subcommands in this tutorial. To learn how to add subcommands, please see the <a :href="$conf.line.base_url + '/#/tutorials/adding-subcommands'">Adding Subcommands</a> tutorial.
</template>
