<script>
export const resource = {
  paths: ["/tutorials/responses/redirects"],
  meta: {
    title: "Redirects",
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
  p Drash defines redirections according to the MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections" target="_BLANK">https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections</a>
  p Permanently redirect:
  code-block(:header="false" language="typescript")
    | this.response.redirect(301, "https://drash.land")
  p Temporarily redirect:
  code-block(:header="false" language="typescript")
    | this.response.redirect(302, "/cola/1")
  p You can redirect using a fully-qualified URL or a relative URL as seen in the example code blocks above.

  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts
    |   cola_resource.ts

  hr
  h2-hash Steps
  ol
    li
      p Create your <code>ColaResource</code> file.
      code-block(title="/path/to/your/project/cola_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | export default class ColaResource extends Drash.Http.Resource {
        |   protected COLAS: any = {
        |     1: "Diet Cola",
        |     2: "Vanilla Cola",
        |     3: "Cherry Cola",
        |   };
        | 
        |   static paths = ["/cola/:id"];
        | 
        |   public GET() {
        |     let colaId = this.request.getPathParam("id");
        | 
        |     if (!COLAS[colaId]) {
        |       return this.response.redirect(302, "/colas/1");
        |     }
        | 
        |     this.response.body = this.getCola(colaId);
        |     return this.response;
        |   }
        | 
        |   protected getCola(colaId: string) {
        |     return this.COLAS[colaId];
        |   }
        | }
    li
      p Create your app file.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | import ColaResource from "./home_resource.ts";
        | 
        | const server = new Drash.Http.Server({
        |   response_output: "application/json",
        |   resources: [ColaResource],
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
      p Using <code>curl</code> (or similar command), make a <code>GET</code> request to <code>localhost:1447/cola?id=5</code> to be redirected to <code>/cola/1</code>.
      code-block(title="Terminal" language="shell-session")
        | $ curl localhost:1447/cola?id=5
      p You should receive the following response:
      code-block(:header="false")
        | Diet Cola
</template>
