<script>
  import H2Hash from "/common/vue/h2_hash.vue";
  import Page from "/common/vue/page.vue";
  import CodeBlock from "/common/vue/code_block.vue";

  const title = "update";

  export const resource = {
    paths: [
      "/cli-commands/update",
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
  p The <code>update</code> command will update your out-of-date dependencies if there are newer releases available. The way this works is, dmm will check the version on your imported/exported dependencies and compare them with the latest version.
  p This command requires the following permissions:
    ul
      li <code>--allow-net</code>: dmm uses HTTP requests to fetch information on the given module.
      li <code>--allow-read</code>: dmm needs to read your dependency file to gather the dependencies you have.
      li <code>--allow-write</code>: dmm will update the version strings inside your <code>deps.ts</code>.
  hr
  h2-hash Example Usage
  h3 Update a single dependency.
  p In this example, we are updating the dependency passed to the <code>update</code> command.
  code-block(title="Terminal" language="shell-session")
    | $ cat deps.ts
  code-block(title="dep.ts" language="typescript")
    | import { serve } from "https://deno.land/std@0.55.0/http/server.ts"; // out of date
  code-block(title="Terminal" language="shell-session")
    | $ dmm update http
  code-block(title="Terminal" language="shell-session")
    | INFO Reading deps.ts to gather your dependencies...
    | INFO Checking if your modules can be updated...
    | INFO http was updated from 0.55.0 to {{ $conf.deno_std.latest_version }}
  code-block(title="Terminal" language="shell-session")
    | $ cat deps.ts
  code-block(title="dep.ts" language="typescript")
    | import { serve } from "https://deno.land/std@{{ $conf.deno_std.latest_version }}/http/server.ts"; // now up to date
  h3 Update multiple dependencies.
  p In this example, we are updating the dependencies passed to the <code>update</code> command.
  code-block(title="Terminal" language="shell-session")
    | $ cat deps.ts
  code-block(title="dep.ts" language="typescript")
    | import { serve } from "https://deno.land/std@0.55.0/http/server.ts"; // out of date
    | import { Drash } from "https://deno.land/x/drash@v1.0.7/mod.ts"; // out of date
  code-block(title="Terminal" language="shell-session")
    | $ dmm update http drash
  code-block(title="Terminal" language="shell-session")
    | INFO Reading deps.ts to gather your dependencies...
    | INFO Checking if your modules can be updated...
    | INFO http was updated from 0.55.0 to {{ $conf.deno_std.latest_version }}
    | INFO drash was updated from v1.0.7 to {{ $conf.drash.latest_version }}
  h3 Update all dependencies.
  p In this example, we are updating all dependencies by not passing any arguments to the <code>update</code> command.
  code-block(title="Terminal" language="shell-session")
    | $ cat deps.ts
  code-block(title="dep.ts" language="typescript")
    | import { serve } from "https://deno.land/std@0.55.0/http/server.ts"; // out of date
    | import { Drash } from "https://deno.land/x/drash@v1.0.7/mod.ts"; // out of date
  code-block(title="Terminal" language="shell-session")
    | $ dmm update
  code-block(title="Terminal" language="shell-session")
    | INFO Reading deps.ts to gather your dependencies...
    | INFO Checking if your modules can be updated...
    | INFO http was updated from 0.55.0 to {{ $conf.deno_std.latest_version }}
    | INFO drash was updated from v1.0.7 to {{ $conf.drash.latest_version }}
</template>

