<script>

const title = "Reserved Event Names";

export const resource = {
  paths: [
    "/tutorials/reserved-event-names",
  ],
  meta: {
    title: title
  }
}

export default {
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
  p The following list of reserved event names are:
  ul
    li <code>connect</code> - Can be listened on, fires when a client connects to your Wocket server
    li <code>disconnect</code> - Can be listened on, fires when a client disconnects from your Wocket server
  p These events are handled internally by Wocket.
  p In this tutorial, you will:
  ul
    li create a server;
    li Listen on the <code>connect</code> and <code>disconnect</code> event names
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
        | await server.run({
        |   hostname: "127.0.0.1",
        |   port: 1777,
        | });
        |
        | console.log(
        |   `Server started on ws://${server.hostname}:${server.port}`,
        | );
        |
    li
      p Create your listeners for the reserved event names.
      code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="16-25")
        | import { Packet, Server } from "https://deno.land/x/wocket@{{ $conf.wocket.latest_version }}/mod.ts";
        |
        | // Create the server
        | const server = new Server();
        |
        | // Run the server
        | await server.run({
        |   hostname: "127.0.0.1",
        |   port: 1777,
        | });
        |
        | console.log(
        |   `Server started on ws://${server.hostname}:${server.port}`,
        | );
        |
        | // Channel is already open, but we can create a listener
        | server.on("connect", (packet: Packet) => {
        |   console.log("A client connected");
        |   // Do something here...
        | });
        | // Channel is already open, but we can create a listener
        | server.on("disconnect", (packet: Packet) => {
        |   console.log("A client disconnected");
        |   // Do something here...
        | });
    li
      p Create a client.
      code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="26-29")
        | import { Packet, Server } from "https://deno.land/x/wocket@{{ $conf.wocket.latest_version }}/mod.ts";
        | // Create the server
        | const server = new Server();
        |
        | // Run the server
        | await server.run({
        |   hostname: "127.0.0.1",
        |   port: 1777,
        | });
        |
        | console.log(
        |   `Server started on ws://${server.hostname}:${server.port}`,
        | );
        |
        | // Channel is already open, but we can create a listener
        | server.on("connect", (packet: Packet) => {
        |   console.log("A client connected");
        |   // Do something here...
        | });
        | // Channel is already open, but we can create a listener
        | server.on("disconnect", (packet: Packet) => {
        |   console.log("A client disconnected");
        |   // Do something here...
        | });
        |
        | const client = new WebSocket(`ws://${server.hostname}:${server.port}`);
        | client.onopen = function () {
        |   client.close()
        | }
  hr
  h2-hash Verification
  ol
    li
      p Run your server.
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-net app.ts
    li
      p The output in your shell should look like this:
      code-block(title="Terminal" language="shell-session")
        | Server started on ws://127.0.0.1:1777
        | A client connected
        | A client disconnected
</template>

