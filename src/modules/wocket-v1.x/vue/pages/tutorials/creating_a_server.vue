<script>
import H2Hash from "/assets/common/vue/h2_hash.vue";
import Page from "/assets/common/vue/page.vue";
import CodeBlock from "/assets/common/vue/code_block.vue";

const title = "Creating A Server";

export const resource = {
  paths: [
    "/tutorials/creating-a-server",
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
      base_url: this.$conf.wocket.base_url + "/#",
      title: title,
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
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
  h2-hash Before You Get Started
  p In this tutorial, you will create a very basic server that can handle <code>ping</code>, <code>pong</code>, and <code>test</code> packets.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     app.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your server.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
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
        | // Or use startTLS for SSL support
        | // server.runTLS({
        | //   hostname: "127.0.0.1",
        | //   port: 1777,
        | //   certFile: "path/to/cert.crt",
        | //   keyFile: "path/to/key.key"
        | // })
        |
        | console.log(
        |   `Server started on ws://${server.hostname}:${server.port}`,
        | );
  hr
  h2-hash Verification
  ol
    li
      p Run your server.
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-net app.ts
    li
      p Connect to your server.
      code-block(title="Terminal" language="shell-session")
        | $ wscat -c ws://127.0.0.1:1777
    li
      p Send a <code>ping</code> packet.
      code-block(title="Terminal" language="shell-session")
        | > ping
      p You should receive the following response:
      code-block(:header="false" language="shell-session")
        | < pong
    li
      p Send a <code>pong</code> packet.
      code-block(title="Terminal" language="shell-session")
        | > pong
      p You should receive the following response:
      code-block(:header="false" language="shell-session")
        | < ping
    li
      p Send a <code>test</code> packet.
      code-block(title="Terminal" language="shell-session")
        | > test
      p You should receive the following response:
      code-block(:header="false" language="shell-session")
        | < Server started on 127.0.0.1:1777.
    li
      p Send an <code>id</code> packet.
      code-block(title="Terminal" language="shell-session")
        | > id
      p You should receive a response similar to the following:
      code-block(:header="false" language="shell-session")
        | < Client ID: 4
</template>

