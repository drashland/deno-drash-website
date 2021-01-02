<script>
import H2Hash from "/common/vue/h2_hash.vue";
import Page from "/common/vue/page.vue";
import CodeBlock from "/common/vue/code_block.vue";

const title = "info";

export const resource = {
  paths: [
    "/cli-commands/info",
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
  p The <code>info</code> command will fetch information on any module, be it 3rd party or Deno Standard.
  p This command requires the following permission:
  ul
    li <code>--allow-net</code>: dmm uses HTTP requests to fetch information on the given module(s).
  hr
  h2-hash Example Usage
  ul
    li
      p Get information on a <code>http</code> std module and drash 3rd part module.
      code-block(title="Terminal" language="shell-session")
        | $ dmm info http drash
      code-block(title="Terminal" language="shell-session")
        | INFO Information on http
        |
        |   - Name: http
        |   - Description: Cannot retrieve descriptions for std modules
        |   - deno.land Link: https://deno.land/std@{{ $conf.deno_std.latest_version }}/http
        |   - GitHub Repository: https://github.com/denoland/deno/tree/master/std/http
        |   - Import Statement: import * as http from "https://deno.land/std@{{ $conf.deno_std.latest_version }}/http";
        |   - Latest Version: {{ $conf.deno_std.latest_version }}
        |
        | INFO Information on drash
        |
        |   - Name: drash
        |   - Description: A REST microframework for Deno's HTTP server with zero dependencies.
        |   - deno.land Link: https://deno.land/x/drash@{{ $conf.drash.latest_version }}
        |   - GitHub Repository: https://github.com/drashland/deno-drash
        |   - Import Statement: import * as drash from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}";
        |   - Latest Version: {{ $conf.drash.latest_version }}
</template>

