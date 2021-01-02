<script>
import H2Hash from "/common/vue/h2_hash.vue";
import Page from "/common/vue/page.vue";
import CodeBlock from "/common/vue/code_block.vue";

const title = "Add Clients To Channels";

export const resource = {
  paths: [
    "/tutorials/adding-clients-to-channels",
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
  p Adding clients to channels can be done using the following call:
  code-block(:header="false" language="typescript")
    | server.addClientToChannel("Channel Name", clientId);
  p In this tutorial, you will:
  ul
    li create a server;
    li Open two channels and have one client call the server to tell it to add the other client to a channel.
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
      p Add a packet handler to the Actions channel (see the highlighted code).
      code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="21-40")
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
        | server.on("Channel 1", (packet: Packet) => {});
        |
        | // Open the Actions channel and add a handler for packets sent to the Actions channel. This handler will be
        | // executed every time a packet is sent to the Actions channel. In this
        | // handler, we are parsing the packet and taking an action based on the
        | // specified message.
        | server.on("Actions", (packet: Packet) => {
        |   const message = packet.message as {[k: string]: string};
        |   if (message.action && message.channel) {
        |     try {
        |       if (message.action == "add_client_to_channel") {
        |         server.addClientToChannel(message.channel, parseInt(message.client_id));
        |         server.to(
        |           "Actions",
        |           `Client #${message.client_id} was added to the ${message.channel} channel.`
        |         );
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
      p Connect the first client to your server.
      code-block(title="Terminal" language="shell-session")
        | $ wscat -c ws://127.0.0.1:1777
    li
      p Connect the second client to your server and get its ID.
      code-block(title="Terminal" language="shell-session")
        | $ wscat -c ws://127.0.0.1:1777
      code-block(title="Terminal" language="shell-session")
        | > id
      p You should receive a response similar to the following:
      code-block(title="Terminal" language="text")
        | < Client ID: 5
    li
      p Using the first client, connect to the Actions channel.
      code-block(title="Terminal" language="text")
        | > {"connect_to":["Actions"]}
      p You should receive the following response:
      code-block(title="Terminal" language="text")
        | > Connected to Actions.
    li
      p Using the first client, send a packet to the Actions channel to add the second client to Channel 1. Make sure you use the correct client ID!
      code-block(title="Terminal" language="text")
        | > {"send_packet":{"to":"Actions","message":{"action":"add_client_to_channel","client_id":"5","channel":"Channel 1"}}}
      p You should receive a response similar to the following:
      code-block(:header="false" language="text")
        | < {"from":"Server","to":"Actions","message":"Client #5 was added to the Channel 1 channel."}
    li
      p Using the second client, disconnect from Channel 1.
      code-block(title="Terminal" language="text")
        | > {"disconnect_from":["Channel 1"]}
      p If the second client was connected, you should receive the following response:
      code-block(:header="false" language="text")
        | < Disconnected from Channel 1.
</template>

