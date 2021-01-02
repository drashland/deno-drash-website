<script>
export const resource = {
  paths: ["/tutorials/cookies/response-cookies"],
  meta: {
    title: "Response Cookies",
    tutorial_title: "Response Cookies",
  }
}

export default {
  data() {
    return {
      title: resource.meta.title,
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
  p In this tutorial, you will learn how to set cookies on a response object and delete them.
  p Drash uses <a href="https://deno.land/std/http/cookie.ts" target="_BLANK">cookie.ts</a> from Deno Standard Modules' HTTP module for its cookie schema.
  p Setting a cookie on a response object can be done using the following call:
  code-block(:header="false" language="typescript")
    | this.response.setCookie({
    |   name: "MINI",
    |   value: "Cooper",
    |   expiry: 'some date'
    |   ...
    | });
  p Deleting a cookie from a response object can be done using the following call:
  code-block(:header="false" language="typescript")
    | this.response.delCookie("cookie_name");
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts
    |   home_resource.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your resource file. This file will set the <code>my_cookie</code> cookie on the response object.
      code-block(title="/path/to/your/project/home_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | export default class HomeResource extends Drash.Http.Resource {
        | 
        |   static paths = ["/"];
        | 
        |   public GET() {
        |     this.response.setCookie({name: "my_cookie", value: "chocolate"})
        |     this.response.body = "my_cookie cookie sent!"
        |     return this.response;
        |   }
        | 
        |   public DELETE() {
        |     this.response.setCookie({
        |       name: "my_cookie",
        |       value: "chocolate"
        |     });
        |     this.response.delCookie("my_cookie");
        |     this.response.body = "my_cookie cookie was set and deleted!"
        |     return this.response;
        |   }
        | }

    li
      p Create your app file.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | import HomeResource from "./home_resource.ts";
        | 
        | const server = new Drash.Http.Server({
        |   response_output: "application/json",
        |   resources: [HomeResource],
        | });
        | 
        | server.run({
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
      p Using <code>curl</code> (or similar command), make a <code>GET</code> request to <code>localhost:1447/</code>.
      code-block(title="Terminal" language="shell-session")
        | $ curl --verbose localhost:1447
      p You should receive the following response:
      code-block(:header="false" line_highlight="11")
        | *   Trying 127.0.0.1...
        | * TCP_NODELAY set
        | * Connected to localhost (127.0.0.1) port 1447 (#0)
        | > GET / HTTP/1.1
        | > Host: localhost:1447
        | > User-Agent: curl/7.64.1
        | > Accept: */*
        | >
        | < HTTP/1.1 200 OK
        | < content-type: application/json
        | < set-cookie: my_cookie=chocolate
        | < content-length: 24
        | <
        | * Connection #0 to host localhost left intact
        | "my_cookie cookie sent!"* Closing connection 0
    li
      p Using <code>curl</code> (or similar command), make a <code>DELETE</code> request to <code>localhost:1447/</code>.
      code-block(title="Terminal" language="shell-session")
        | $ curl --request DELETE --verbose localhost:1447
      p You should receive the following response:
      code-block(:header="false" line_highlight="11")
        | *   Trying 127.0.0.1...
        | * TCP_NODELAY set
        | * Connected to localhost (127.0.0.1) port 1447 (#0)
        | > DELETE / HTTP/1.1
        | > Host: localhost:1447
        | > User-Agent: curl/7.64.1
        | > Accept: */*
        | >
        | < HTTP/1.1 200 OK
        | < content-type: application/json
        | < set-cookie: my_cookie=; Expires=Thu, 01 Jan 1970 00:00:00 GMT
        | < content-length: 39
        | <
        | * Connection #0 to host localhost left intact
        | "my_cookie cookie was set and deleted!"* Closing connection 0
</template>
