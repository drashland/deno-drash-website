<script>
import H2Hash from "/common/vue/h2_hash.vue";
import Page from "/common/vue/page.vue";
import CodeBlock from "/common/vue/code_block.vue";
import DivAlertFinishedTutorialSeries from "/common/vue/div_alert_finished_tutorial_series.vue";
import Breadcrumbs from "/common/vue/breadcrumbs.vue";

const title = "Creating A Chat App";
const subtitle = "Part 1: Opening A Channel";

export const resource = {
  paths: [
    "/advanced-tutorials/creating-a-chat-app/part-3",
  ],
  meta: {
    title: title
  }
}

export default {
  components: {
    Breadcrumbs,
    CodeBlock,
    DivAlertFinishedTutorialSeries,
    H2Hash,
    Page,
  },
  data() {
    return {
      base_url: this.$conf.wocket.base_url,
      base_uri: "/advanced-tutorials/creating-a-chat-app",
      title: title,
      subtitle: subtitle,
      index: `<!DOCTYPE html>
<html class="h-full w-full">
  <head>
    <title>Wocket</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
  </head>
  <style>
    body { font-family: "Courier New"; }
    #messages_container { height: 350px; }
    .message {
      border-bottom: 1px solid #000000;
      padding: 5px;
    }
  </style>
  <body>
    <div class="mx-auto border border-black mt-10 p-2" id="container" style="max-width: 500px">
      <div class="font-bold bg-black text-white text-center p-3" id="banner">Wocket Chat</div>
      <div class="overflow-x-auto" id="messages_container">
        <ul id="messages_list"></ul>
      </div>
      <div class="flex">
        <input class="w-1/2 border border-black p-2 mr-1" id="user_name" type="text" placeholder="user name" />
        <input class="w-1/2 border border-black p-2" id="user_message" type="text" placeholder="message" />
      </div>
      <button class="p-2 text-white bg-black w-full mt-1" id="send_message">send message</button>
    </body>
    <script src="chat.js"><\/script>
</html>`,
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
  breadcrumbs(:base_url="base_url + base_uri" :part="3" :parts="3")
  hr
  h2-hash Before You Get Started
  p In this tutorial part, you will create the front-end of your application.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     app.ts
      |     chat.js
      |     index.html
  hr
  h2-hash Steps
  ol
    li
      p Create your <code>index.html</code> file.
      code-block(title="/path/to/your/project/index.html" language="html")
        | {{ index }}
    li
      p Create your <code>chat.js</code> file. This file will contain the code that handles your client connections.
      code-block(title="/path/to/your/project/chat.js" language="javascript")
        | // Create WebSocket connection.
        | const socket = new WebSocket("ws://127.0.0.1:1777");
        |
        | // Connection opened
        | socket.addEventListener("open", function (event) {
        |   console.log("Connected!");
        |   // Connect to the General channel
        |   socket.send(JSON.stringify({
        |     connect_to:["General"]
        |   }));
        | });
        |
        | // Listen for messages
        | socket.addEventListener("message", function (event) {
        |   try {
        |     addMessageToList(event);
        |   } catch (error) {
        |     console.log(event.data);
        |   }
        | });
        |
        | // When the "send message" button is clicked, execute the following.
        | document.getElementById("send_message").addEventListener("click", () => {
        |   socket.send(JSON.stringify({
        |     send_packet: {
        |       to: "General",
        |       message: {
        |         user_name: document.getElementById("user_name").value,
        |         user_message: document.getElementById("user_message").value
        |       }
        |     }
        |   }));
        | });
        |
        | /**
        |  * Add a message to the messages list.
        |  * @param {Object} event
        |  */
        | function addMessageToList(event) {
        |   const parsedMessage = JSON.parse(event.data);
        |   const messageString = `${parsedMessage.message.user_name}: ${parsedMessage.message.user_message}`;
        |   const li = document.createElement("li");
        |   li.className = "message";
        |   li.appendChild(document.createTextNode(messageString));
        |   document.getElementById("messages_list").appendChild(li);
        |   // Scroll to the last message
        |   document.getElementById("messages_container").scrollTop = document.getElementById("messages_container").scrollHeight;
        | }
  hr
  h2-hash Verification
  ol
    li
      p Run your server.
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-net app.ts
    li
      p Open up your <code>index.html</code> file in your browser. This browser window will be your first client. If you open your browser's console, you should see that you are connected to the server and connected to the General channel.
    li
      p Open up your <code>index.html</code> file in another browser window. This browser window will be your second client.
    li
      p Send messages between the two browser windows (aka clients).
  div-alert-finished-tutorial-series
  hr
  breadcrumbs(:base_url="base_url + base_uri" :part="3" :parts="3")
</template>

