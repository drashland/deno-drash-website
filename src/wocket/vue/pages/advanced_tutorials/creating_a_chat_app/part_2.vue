<script>
import H2Hash from "/common/vue/h2_hash.vue";
import Page from "/common/vue/page.vue";
import CodeBlock from "/common/vue/code_block.vue";
import DivAlertNextTutorialPart from "/common/vue/div_alert_next_tutorial_part.vue";
import Breadcrumbs from "/common/vue/breadcrumbs.vue";

const title = "Creating A Chat App";
const subtitle = "Part 1: Opening A Channel";

export const resource = {
  paths: [
    "/advanced-tutorials/creating-a-chat-app/part-2",
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
    H2Hash,
    Page,
  },
  data() {
    return {
      base_url: this.$conf.wocket.base_url,
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
  breadcrumbs(:base_url="base_url + base_uri" :part="2" :parts="3")
  hr
  h2-hash Before You Get Started
  p In this tutorial part, you will open the channel that will be used by clients.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     app.ts
  hr
  h2-hash Steps
  ol
    li
      p Import the <code>Packet</code> class, open the General channel, and add a packet handler for it (see the highlighted code).
      code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="1,16-23")
        | import { Packet, Server } from "https://deno.land/x/wocket@{{ $conf.wocket.latest_version }}/mod.ts";
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
        |
        | // Open the General channel and add the General channel's packet handler
        | server.on("General", (packet: Packet) => {
        |     // Send the incoming message to all clients in the General channel
        |     server.to("General", packet.message);
        | });
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
      p Connect to the General channel.
      code-block(title="Terminal" language="shell-session")
        | > {"connect_to":["General"]}
    li
      p Send a packet to the General channel.
      code-block(title="Terminal" language="shell-session")
        | > {"send_packet":{"to":"General","message":"test"}}
      p You should receive the following response:
      code-block(:header="false" language="shell-session")
        | < {"from":"Server","to":"General","message":"test"}
    p You can now move on to the next tutorial part.
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + base_uri" :part="2" :parts="3")
</template>

