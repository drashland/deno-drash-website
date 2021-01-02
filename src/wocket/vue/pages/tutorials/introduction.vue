<script>
import H2Hash from "/common/vue/h2_hash.vue";
import Page from "/common/vue/page.vue";
import CodeBlock from "/common/vue/code_block.vue";

const title = "Tutorials: Introduction";

export const resource = {
  paths: [
    "/tutorials",
    "/tutorials/introduction",
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
        "About The Tutorials",
        "wscat",
        "Definitions",
        "Sending Packets",
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
  h2-hash About The Tutorials
  p The tutorials in the sidebar are ordered (from top to bottom) in a way that will help you understand Wocket quickly &mdash; from creating a server to interacting with it. Since all tutorials have example code of setting up and starting a server, it is not required that you read the tutorials in order. However, it is greatly recommended.
  hr
  h2-hash wscat
  p All tutorials have a Verification section where you will interact with a server. The Verification section requires that you install <code>wscat</code> globally. To install <code>wscat</code>, run the following command:
  code-block(title="Terminal" language="shell-session")
    | $ npm install -g wscat
  p Once you have installed <code>wscat</code>, you can use it through the command line via <code>wscat</code> command.
  hr
  h2-hash Definitions
  ul
    li
      p
        strong Channel
      p A channel is the same thing as a room or an event. In Wocket, we use the term "channel", so please keep that in mind.
    li
      p
        strong Packet
      p A packet is an object containing a sender, a receiver, and a message. It is an advanced form of a message. In Wocket, we use the term packets to describe the data that is being sent and received. A packet has the following fields:
      ul
        li
          p
            strong <code>from</code>
          p The entity sending the packet. This entity can be a client or the server.
        li
          p
            strong <code>to</code>
          p The entity receiving the packet. This entity can be a client or a channel.
        li
          p
            strong <code>message</code>
          p The packet's message. This can be anything (e.g., a string, a number, binary data, or even a JSON object).
  hr
  h2-hash Sending Packets
  p At times, you will be sending certain packets to a server using <code>wscat</code>. There are multiple packets that a Wocket server listens to. On receipt of one of the packets below, it will respond as stated below.
  ul
    li
      p
        strong <code>ping</code>
      p Sending a ping packet will result in a pong packet from the server. The packet is written as follows:
      code-block(:header="false" language="shell-session")
        | > ping
    li
      p
        strong <code>pong</code>
      p Sending a pong packet will result in a ping packet from the server. This packet is written as follows:
      code-block(:header="false" language="shell-session")
        | > pong
    li
      p
        strong <code>test</code>
      p Sending a test packet will result in the server responding with its address information (e.g., Server started on 127.0.0.1:1777.). This packet is written as follows:
      code-block(:header="false" language="shell-session")
        | > test
    li
      p
        strong <code>id</code>
      p Sending an id packet will result in the server responding with the client's ID (e.g., Client ID: 5.). This packet is written as follows:
      code-block(:header="false" language="shell-session")
        | > id
    li
      p
        strong <code>connect_to</code>
      p This packet allows you to connect to channels. This packet is written as follows:
      code-block(:header="false" language="shell-session")
        | > { "connect_to": ["channel name", "another channel", "some other channel"] }
    li
      p
        strong <code>disconnect_from</code>
      p This packet allows you to disconnect from channels. This packet is written as follows:
      code-block(:header="false" language="shell-session")
        | > { "disconnect_from": ["channel name", "another channel", "some other channel"] }
    li
      p
        strong <code>send_packet</code>
      p This packet is used to send more complex packets. The server will respond based on a specified packet handler. You will learn more about the packet handlers in the tutorials. This packet is written as follows:
      code-block(:header="false" language="shell-session")
        | > { "send_packet": { "to": "channel name", "message": "some message" } }
</template>

