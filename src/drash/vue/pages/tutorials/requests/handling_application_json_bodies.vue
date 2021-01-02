<script>
export const resource = {
  paths: ["/tutorials/requests/handling-json-bodies"],
  meta: {
    title: "Handling JSON Bodies",
    source_code_uri: "/tutorials/requests/handling_application_json_bodies"
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
  p Getting a value from an <code>application/json</code> request's body can be done using the following call:
  code-block(:header="false" language="typescript")
    | const param = this.request.getBodyParam("param_name");
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts
    |   home_resource.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your resource file. You resource file will check for the <code>name</code> param in the request's body. If it exists, then it will return what was passed in. If it does not exist, then it will throw a <code>400 Bad Request</code> response.
      code-block(title="/path/to/your/project/home_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | export default class HomeResource extends Drash.Http.Resource {
        | 
        |   static paths = [
        |     "/"
        |   ];
        | 
        |   public POST() {
        |     const param = this.request.getBodyParam("name");
        | 
        |     if (!param) {
        |       throw new Drash.Exceptions.HttpException(
        |         400,
        |         "This resource requires the `name` body param."
        |       );
        |     }
        | 
        |     this.response.body = `You passed in the following body param: ${param}`;
        | 
        |     return this.response;
        |   }
        | 
        | }

    li
      p Create your app file.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | import HomeResource from "./home_resource.ts";
        | 
        | const server = new Drash.Http.Server({
        |   response_output: "text/plain",
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
    li Run your app.
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-net app.ts
    li
      p Using <code>curl</code> (or similar command), make a <code>POST</code> request to <code>localhost:1447/</code> and pass in <code>{"name":"denosaurus"}</code> in the request body.
      code-block(title="Terminal" language="shell-session")
        | $ curl --header "Content-Type: application/json" \
        | --request POST \
        | --data '{"name":"denosaurus"}' \
        | localhost:1447
      p You should receive the following response:
      code-block(:header="false" language="shell-session")
        | You passed in the following body param: denosaurus
    li
      p Make the same request, but change the data to use <code>username</code> instead of <code>name</code>.
      code-block(title="Terminal" line_highlight="3" language="shell-session")
        | $ curl --header "Content-Type: application/json" \
        | --request POST \
        | --data '{"username":"denosaurus"}' \
        | localhost:1447
      p You should receive the following response:
      code-block(:header="false" language="shell-session")
        | This resource requires the `name` body param.
</template>
