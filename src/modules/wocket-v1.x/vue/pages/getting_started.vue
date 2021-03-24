<script>
import H2Hash from "/assets/common/vue/h2_hash.vue";
import CodeBlock from "/assets/common/vue/code_block.vue";
import CodeBlockImport from "/assets/common/vue/code_block_import.vue";
import IntroductionHeader from "/assets/common/vue/introduction_header.vue";

export const resource = {
  paths: ["/", "/introduction"],
  meta: {
    title: "Introduction",
  }
}

export default {
  components: {
    H2Hash,
    CodeBlock,
    CodeBlockImport,
    IntroductionHeader,
  },
  data() {
    return {
    };
  }
}
</script>

<template lang="pug">
div
  introduction-header(heading="Wocket" description="Wocket is a WebSocket library for Deno")
  div.flex.mb-5
    a(href="https://github.com/drashland/wocket/releases" target="_BLANK")
      img.mr-1(alt="Latest Wocket Release" src="https://img.shields.io/github/release/drashland/wocket.svg?color=brightgreen&label=Latest" width="auto" height="20")
    a(href="https://github.com/drashland/wocket/actions" target="_BLANK")
      img.mr-1(alt="Wocket CI" src="https://img.shields.io/github/workflow/status/drashland/wocket/master?label=CI" width="auto" height="20")
    a(href="https://discord.gg/SgejNXq" target="_BLANK")
      img.mr-1(alt="Drash Land Discord" src="https://img.shields.io/badge/Chat-on%20Discord-blue")
    a(href="https://twitter.com/drash_land" target="_BLANK")
      img.mr-1(alt="Drash Land Twitter" src="https://img.shields.io/twitter/url?label=%40drash_land&style=social&url=https%3A%2F%2Ftwitter.com%2Fdrash_land" width="auto" height="20")
    //a(href="https://rb.gy/vxmeed" target="_BLANK")
      img(alt="Wocket YouTube" src="https://img.shields.io/badge/Tutorials-YouTube-red" width="auto" height="20")
  div
    hr
    h2-hash Quickstart
    ol
      li
        p Create your server and allow it to handle a single channel named Channel 1.
        code-block(title="app.ts" language="typescript")
          | import { Server } from "https://deno.land/x/wocket@{{ $conf.wocket.latest_version }}/mod.ts";
          |
          | // Create the server
          | const server = new Server();
          |
          | // Run the server
          | server.run({
          |   hostname: "127.0.0.1",
          |   port: 1777,
          | });
          |
          | console.log(
          |   `Server started on ws://${server.hostname}:${server.port}`,
          | );
      li
        p Run your server.
        code-block(title="Terminal" language="shell-session")
          | $ deno run --allow-net app.ts
        code-block(title="Terminal" language="shell-session")
          | Server started on ws://127.0.0.1:1777
      li
        p Install <code>wscat</code> or similar client to interact with your server.
        code-block(title="Terminal" language="shell-session")
          | $ npm install -g wscat
      li
        p Connect to your server.
        code-block(title="Terminal" language="shell-session")
          | $ wscat -c ws://127.0.0.1:1777
      li
        p Ping your server.
        code-block(title="Terminal" language="shell-session")
          | > ping
          |
          | < pong
    hr
    h2-hash Importing
    code-block-import(name="Server" repo="wocket" :version="$conf.wocket.latest_version")
    hr
    h2-hash Features
    ul
      li
        p JSON encoding
      li
        p Zero 3rd party dependencies
</template>
