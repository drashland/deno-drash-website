<script>
  import H2Hash from "/common/vue/h2_hash.vue";
  import Page from "/common/vue/page.vue";
  import CodeBlock from "/common/vue/code_block.vue";

  const title = "help";

  export const resource = {
    paths: [
      "/cli-commands/help",
    ],
    meta: {
      title: title
    }
  }

  export default {
    components: {
      CodeBlock,
      H2Hash,
      Page,
    },
    data() {
      return {
        base_url: this.$conf.dmm.base_url,
        title: title,
        toc: [
          "Description",
          "Example Usage",
        ],
      };
    }
  }
</script>

<template lang="pug">
page(
  :base_url="base_url"
  :title="title"
  :toc="toc"
)
  h2-hash Description
  p The <code>help</code> command will give information on how to use dmm.
  hr
  h2-hash Example Usage
  code-block(title="Terminal" language="shell-session")
    | $ dmm --help
  code-block(title="Terminal" language="shell-session")
    | A module manager for Deno.
    |
    | USAGE
    |
    |     deno install --allow-net='cdn.deno.land,api.deno.land,x.nest.land' --allow-read='.' --allow-write='deps.ts' https://deno.land/x/dmm@{{ $conf.dmm.latest_version }}/mod.ts
    |     dmm [SUBCOMMAND]
    |
    | SUBCOMMANDS
    |
    |     check [modules]
    |         Checks the specified modules for newer version. Will check all if modules are
    |         omitted.
    |
    |     update [modules]
    |         Updates the specified modules to the newest version. Will update all if modules
    |         are omitted.
    |
    |     info [modules]
    |         Displays information about the given modules, be it std or 3rd party. The 3rd
    |         party module must be referenced at https://deno.land/x/
    |
    |     help, --help
    |         Prints the help message
    |
    |     version, --version
    |         Prints the current dmm version
    |
    |
    | EXAMPLE USAGE
    |
    |     Install dmm
    |         deno install --allow-net='cdn.deno.land,api.deno.land,x.nest.land' --allow-read='.' --allow-write='deps.ts' https://deno.land/x/dmm@{{ $conf.dmm.latest_version }}/mod.ts
    |
    |     Check a single module
    |         dmm check fs
    |
    |     Update a single module
    |         dmm update fs
    |
    |     Get information about a module
    |         dmm info http
</template>

