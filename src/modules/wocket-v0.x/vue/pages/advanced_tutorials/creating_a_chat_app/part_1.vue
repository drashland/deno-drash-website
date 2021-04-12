<script>
import Breadcrumbs from "/assets/common/vue/breadcrumbs.vue";
import CodeBlock from "/assets/common/vue/code_block.vue";
import DivAlertNextTutorialPart from "/assets/common/vue/div_alert_next_tutorial_part.vue";
import H2Hash from "/assets/common/vue/h2_hash.vue";
import Page from "/assets/common/vue/page.vue";

const title = "Creating A Chat App";
const subtitle = "Part 1: Creating The Server";

export const resource = {
  paths: [
    "/advanced-tutorials/creating-a-chat-app/part-1",
  ],
  meta: {
    title: title
  }
}

export default {
  components: {
    Breadcrumbs,
    CodeBlock,
    DivAlertNextTutorialPart,
    Page,
    H2Hash,
  },
  data() {
    return {
      base_url: this.$conf.wocket.base_url + "/#",
      base_uri: "/advanced-tutorials/creating-a-chat-app",
      title: title,
      subtitle: subtitle,
    };
  }
}
</script>

<template lang="pug">
page(
  :base_url="base_url"
  :subtitle="subtitle"
  :title="title"
)
  breadcrumbs(:base_url="base_url + base_uri" :part="1" :parts="3")
  hr
  h2-hash Before You Get Started
  p In this tutorial part, you will create a server and verify that it can respond.
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
      code-block(title="Terminal" language="text")
        | > ping
      p You should receive the following response:
      code-block(:header="false" language="text")
        | < pong
    li
      p Send a <code>pong</code> packet.
      code-block(title="Terminal" language="text")
        | > pong
      p You should receive the following response:
      code-block(:header="false" language="text")
        | < ping
    li
      p Send a <code>test</code> packet.
      code-block(title="Terminal" language="text")
        | > test
      p You should receive the following response:
      code-block(:header="false" language="text")
        | < Server started on 127.0.0.1:1777.
    li
      p Send an <code>id</code> packet.
      code-block(title="Terminal" language="text")
        | > id
      p You should receive a response similar to the following:
      code-block(:header="false" language="text")
        | < Client ID: 4
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + base_uri" :part="1" :parts="3")
</template>

