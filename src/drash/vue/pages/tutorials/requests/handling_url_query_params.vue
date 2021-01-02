<script>
export const resource = {
  paths: ["/tutorials/requests/handling-url-query-params"],
  meta: {
    title: "Handling URL Query Params",
    source_code_uri: "/tutorials/requests/handling_url_query_params"
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
  p Getting a value from a request's URL query params can be done using the following call:
  code-block(:header="false" language="typescript")
    | const param = this.request.getUrlQueryParam("param_name");
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts
    |   home_resource.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your resource file. You resource file will check for the <code>id</code> URL query param in the request's URL. If it exists and is a <code>number</code>, then it will return what was passed in. If it is <code>NaN</code> or does not exist, then it will throw a <code>400 Bad Request</code> response.
      code-block(title="/path/to/your/project/home_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | export default class HomeResource extends Drash.Http.Resource {
        | 
        |   static paths = [
        |     "/users"
        |   ];
        | 
        |   public GET() {
        |     let userId = this.request.getUrlQueryParam("id");
        | 
        |     if (!userId) {
        |       throw new Drash.Exceptions.HttpException(
        |         400,
        |         "This resource requires the `id` URL query param."
        |       );
        |     }
        | 
        |     userId = parseInt(userId);
        |     if (isNaN(userId)) {
        |       throw new Drash.Exceptions.HttpException(
        |         400,
        |         "This resource requires the `id` URL query param to be a number."
        |       );
        |     }
        | 
        |     this.response.body = `You passed in the following user ID as the URL query param: ${userId}`;
        | 
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
      p Using <code>curl</code> (or similar command), make a <code>GET</code> request to <code>localhost:1447/users?id=1</code>.
      code-block(title="Terminal" language="shell-session")
        | $ curl localhost:1447/users?id=1
      p You should receive the following response:
      code-block(:header="false" language="shell-session")
        | You passed in the following user ID as the URL query param: 1
    li
      p Make the same request, but change the <code>id</code> URL query param to <code>one</code>.
      code-block(title="Terminal" language="shell-session")
        | $ curl localhost:1447/users?id=one
      p You should receive the following response:
      code-block(:header="false" language="shell-session")
        | This resource requires the `id` URL query param to be a number.
    li
      p Make the same request, but do not add the <code>id</code> URL query param.
      code-block(title="Terminal" language="shell-session")
        | $ curl localhost:1447
      p You should receive the following response:
      code-block(:header="false" language="shell-session")
        | This resource requires the `id` URL query param.
</template>
