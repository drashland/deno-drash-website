<script>
const title = "Creating An HTTP Server";

export const resource = {
  paths: ["/tutorials/servers/creating-an-http-server"],
  meta: {
    title: title,
  }
}

export default {
  data() {
    return {
      title: title,
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
      ]
    };
  },
}
</script>

<template lang="pug">
page(
  :base_url="this.$conf.drash.base_url"
  :title="title"
  :toc="toc"
)
  h2-hash Before You Get Started
  p In this tutorial, you will create a very basic server that handles some common requests: <code>GET</code>, <code>POST</code>, <code>PUT</code>, and <code>DELETE</code>.
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts
    |   home_resource.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your resource file. Your resource file will be able to handle <code>GET</code>, <code>POST</code>, <code>PUT</code>, and <code>DELETE</code> requests to the <code>/</code> URI.
      code-block(title="/path/to/your/project/home_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | export default class HomeResource extends Drash.Http.Resource {
        | 
        |   static paths = ["/"];
        | 
        |   public GET() {
        |     this.response.body = "GET request received!";
        |     return this.response;
        |   }
        | 
        |   public POST() {
        |     this.response.body = "POST request received!";
        |     return this.response;
        |   }
        | 
        |   public PUT() {
        |     this.response.body = "PUT request received!";
        |     return this.response;
        |   }
        | 
        |   public DELETE() {
        |     this.response.body = "DELETE request received!";
        |     return this.response;
        |   }
        | }

    li
      p Create your app file. Your app file will register your resource via the <code>resources</code> config. By default, your Drash server will send <code>application/json</code> responses via the <code>response_output</code>.
      p Optionally, you can <code>await</code> on the <code>server.run()</code> call in case you want to run subsequent code after the call. <code>await</code>ing for the <code>server.run()</code> call ensures that your server is running before any subsequent code runs.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | import HomeResource from "./home_resource.ts";
        | 
        | const server = new Drash.Http.Server({
        |   response_output: "application/json", // Accepts text/html, text/xml, application/xml
        |   resources: [HomeResource],
        | });
        | 
        | server.run({ // or await server.run({
        |   hostname: "localhost",
        |   port: 1447
        | });

  hr
  h2-hash Verification
  ol
    li
      p Run your app.
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-net app.ts
    li
      p Using <code>curl</code> (or similar command), make a <code>GET</code> request to <code>localhost:1447/</code>. You should receive the following response:
      code-block(title="Terminal" language="shell-session")
        | $ curl --request GET localhost:1447
      p You should receive the following response:
      code-block(:header="false")
          | GET request received!
    li
      p Make a <code>PUT</code> request.
      code-block(title="Terminal" language="shell-session")
        | $ curl --request PUT localhost:1447
      p You should receive the following response:
      code-block(:header="false")
          | PUT request received!
    li
      p Make a <code>POST</code> request.
      code-block(title="Terminal" language="shell-session")
        | $ curl --request POST localhost:1447
      p You should receive the following response:
      code-block(:header="false")
          | POST request received!
    li
      p Make a <code>DELETE</code> request.
      code-block(title="Terminal" language="shell-session")
        | $ curl --request DELETE localhost:1447
      p You should receive the following response:
      code-block(:header="false")
          | DELETE request received!
    li
      p Make a <code>PATCH</code> request.
      code-block(title="Terminal" language="shell-session")
        | $ curl --request PATCH localhost:1447
      p Since <code>PATCH</code> is not defined in your resource, it is not allowed; therefore, you should receive the following response:
      code-block(:header="false")
        | Method Not Allowed
