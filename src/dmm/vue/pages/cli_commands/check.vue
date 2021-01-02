<script>
  import H2Hash from "/common/vue/h2_hash.vue";
  import Page from "/common/vue/page.vue";
  import CodeBlock from "/common/vue/code_block.vue";

  const title = "check";

  export const resource = {
    paths: [
      "/cli-commands/check",
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
  p The <code>check</code> command will check if:
  ul
    li all of your dependencies can be updated; and
    li shows what dependencies are out of date.
  p This command requires the following permissions:
  ul
    li <code>--allow-net</code>: dmm uses HTTP requests to fetch information on the given module.
    li <code>--allow-read</code>: dmm needs to read your dependency file to gather the dependencies you have.
  hr
  h2-hash Example Usage
  h3 Check a single dependency.
  p In this example, we are checking the dependency passed to the <code>check</code> command.
  code-block(title="Terminal" language="shell-session")
    | $ cat deps.ts
  code-block(title="dep.ts" language="typescript")
    | import { serve } from "https://deno.land/std@0.55.0/http/server.ts"; // out of date
  code-block(title="Terminal" language="shell-session")
    | $ dmm check http
  code-block(title="Terminal" language="shell-session")
    | INFO Reading deps.ts to gather your dependencies...
    | INFO Comparing versions...
    | INFO http can be updated from 0.55.0 to {{ $conf.deno_std.latest_version }}
    | To update, run:
    |     dmm update http
  h3 Check multiple dependencies.
  p In this example, we are checking the dependencies passed to the <code>check</code> command.
  code-block(title="Terminal" language="shell-session")
    | $ cat deps.ts
  code-block(title="dep.ts" language="typescript")
    | import { serve } from "https://deno.land/std@0.55.0/http/server.ts"; // out of date
    | import { Drash } from "https://deno.land/x/drash@v1.0.7/mod.ts"; // out of date
  code-block(title="Terminal" language="shell-session")
    | $ dmm check http drash
  code-block(title="Terminal" language="shell-session")
    | INFO Reading deps.ts to gather your dependencies...
    | INFO Comparing versions...
    | INFO http can be updated from 0.55.0 to {{ $conf.deno_std.latest_version }}
    | INFO drash can be updated from v1.0.7 to {{ $conf.drash.latest_version }}
    | To update, run:
    |     dmm update http drash
  h3 Check all dependencies.
  p In this example, we are checking all dependencies by not passing any arguments to the <code>update</code> command.
  code-block(title="Terminal" language="shell-session")
    | $ cat deps.ts
  code-block(title="dep.ts" language="typescript")
    | import { serve } from "https://deno.land/std@0.55.0/http/server.ts"; // out of date
    | import { Drash } from "https://deno.land/x/drash@v1.0.7/mod.ts"; // out of date
  code-block(title="Terminal" language="shell-session")
    | $ dmm check
  code-block(title="Terminal" language="shell-session")
    | INFO Reading deps.ts to gather your dependencies...
    | INFO Comparing versions...
    | INFO http can be updated from 0.55.0 to {{ $conf.deno_std.latest_version }}
    | INFO drash can be updated from v1.0.7 to {{ $conf.drash.latest_version }}
    | To update, run:
    |     dmm update http drash
</template>

