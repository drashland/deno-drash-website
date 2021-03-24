<script>
import H2Hash from "/assets/common/vue/h2_hash.vue";
import Page from "/assets/common/vue/page.vue";
import CodeBlock from "/assets/common/vue/code_block.vue";

const title = "Sending to Specific Clients";

export const resource = {
  paths: [
    "/tutorials/sending-to-specific-clients",
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
  p Sending packets to specific clients can be done using the following call:
  code-block(:header="false" language="typescript")
    | server.to("the channel", "hello from server", id);
  p In this tutorial, you will:
  ul
    li Create your server.
    li Create two clients and send a packet from one client to the other.
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
        | // Open the channel
        | server.on("chat", (packet: Packet) => {
        |   const id = Number(packet.message)
        |   server.to("chat", `Hello from ${packet.from.id}`, id);
        | })
    li
      p Create the two clients.
      code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="6-30")
        | server.on("chat", (packet: Packet) => {
        |   const id = Number(packet.message)
        |   server.to("chat", `Hello from ${packet.from.id}`, id);
        | })
        |
        | const clientOne = new WebSocket(`ws://${server.hostname}:${server.port}`);
        | const clientTwo = new WebSocket(`ws://${server.hostname}:${server.port}`);
        |
        | clientOne.onopen = function () {
        |   clientOne.send(JSON.stringify({
        |     connect_to: ["chat"]
        |   }));
        | };
        |
        | clientTwo.onopen = function () {
        |   clientTwo.send(JSON.stringify({
        |     connect_to: ["chat"]
        |   }));
        |   clientTwo.send(JSON.stringify({
        |     send_packet: {
        |       to: "chat",
        |       message: 4
        |     }
        |   }))
        | };
        |
        | clientOne.onmessage = function (message) {
        |   console.log('Client one got message!');
        |   console.log(message.data);
        | };
  hr
  h2-hash Verification
  ol
    li
      p Run your server.
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-net app.ts
    li
      p You should see the following in your terminal:
      code-block(title="Terminal" language="shell-session")
        | Server started on ws://127.0.0.1:1777
        | Client one got message!
        | {"from":"Server","to":"chat","message":"Hello from 5"}
</template>

