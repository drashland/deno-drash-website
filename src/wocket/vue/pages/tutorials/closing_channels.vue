<script>
import H2Hash from "/common/vue/h2_hash.vue";
import Page from "/common/vue/page.vue";
import CodeBlock from "/common/vue/code_block.vue";

const title = "Closing Channels";

export const resource = {
  paths: [
    "/tutorials/closing-channels",
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
  p Closing channels can be done using the following call:
  code-block(:header="false" language="typescript")
    | server.closeChannel("Channel Name");
  p In this tutorial, you will:
  ul
    li create a server;
    li open two channels;
    li open one client connection; and
    li have the client call the server to tell it to close one of the channels.
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
    li
      p Open 2 channels and add a packet handler to the Actions channel (see the highlighted code).
      code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="21-37")
        | import { Packet, Server } from "https://deno.land/x/wocket@{{ $conf.wocket.latest_version }}/mod.ts";
        |
        | // Create the server
        | const server = new Server();
        | server.run({
        |   hostname: "127.0.0.1",
        |   port: 1777,
        | });
        |
        | console.log(
        |   `Server started on ws://${server.hostname}:${server.port}`,
        | );
        |
        | // Open the Channel 1 channel so that it can be closed via the Actions channel
        | server.on("Channel 1", (packet:  Packet) => {});
        |
        | // Open the Actions channel and add a handler for packets sent to the Actions channel. This handler will be
        | // executed every time a packet is sent to the Actions channel. In this
        | // handler, we are parsing the message and taking an action based on the
        | // specified message.
        | server.on("Actions", (packet: Packet) => {
        |   const message = packet.message as {[k: string]: string};
        |   if (message.action && message.channel) {
        |     try {
        |       if (message.action == "close_channel") {
        |         server.closeChannel(message.channel);
        |         server.to("Actions", `${message.channel} closed.`);
        |       }
        |     } catch (error) {
        |       console.log(error);
        |     }
        |   }
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
      p Connect to Channel 1.
      code-block(title="Terminal" language="text")
        | > {"connect_to":["Actions", "Channel 1"]}
      p You should receive the following response:
      code-block(:header="false" language="text")
        | < Connected to Actions.
        | < Connected to Channel 1.
    li
      p Send a packet to the Actions channel to close Channel 1.
      code-block(title="Terminal" language="text")
        | > {"send_packet":{"to":"Actions","message":{"action":"close_channel","channel":"Channel 1"}}}
      p You should receive a response similar to the following:
      code-block(:header="false" language="text")
        | < {"from":"Server","to":"Actions","message":"Channel 1 closed."}
    li
      p Try disconnecting from Channel 1. The channel should not be found since it was closed.
      code-block(title="Terminal" language="text")
        | > {"disconnect_from":["Channel 1"]}
      p You should receive the following response:
      code-block(:header="false" language="text")
        | < Channel "Channel 1" not found.
</template>

