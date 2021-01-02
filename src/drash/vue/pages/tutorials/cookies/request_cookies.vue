<script>
export const resource = {
  paths: ["/tutorials/cookies/request-cookies"],
  meta: {
    title: "Request Cookies",
    tutorial_title: "Request Cookies",
    source_code_uri: "/tutorials/cookies/request_cookies"
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
  p In this tutorial, you will learn how to get cookies from a request and parse them into a key-value pair object.
  p Drash uses <a href="https://deno.land/std/http/cookie.ts" target="_BLANK">cookie.ts</a> from Deno Standard Modules' HTTP module for its cookie schema.
  p Getting a cookie from a request can be done using the following call:
  code-block(:header="false" language="typescript")
    | const cookieValue = this.request.getCookie("my_cookie");
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts
    |   home_resource.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your resource file. This file will get the <code>my_cookie</code> cookie value and use it in the response body.
      code-block(title="/path/to/your/project/home_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | export default class HomeResource extends Drash.Http.Resource {
        | 
        |   static paths = ["/"];
        | 
        |   public GET() {
        |     const cookieValue = this.request.getCookie("my_cookie");
        |     this.response.body = `You passed in the following cookie value: ${cookieValue}`;
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
      p Using <code>curl</code> (or similar command), make a <code>GET</code> request to <code>localhost:1447/</code> and pass in the following cookie key-value pair: <code>my_cookie=chocolate</code>.
      code-block(title="Terminal" language="shell-session")
        | $ curl --cookie my_cookie=chocolate localhost:1447
      p You should receive the following response:
      code-block(:header="false")
        | You passed in the following cookie value: chocolate
</template>
