<script>
export const resource = {
  paths: ["/tutorials/requests/handling-path-params"],
  meta: {
    title: "Handling Path Params",
    source_code_uri: "/tutorials/requests/handling_path_params"
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
  p Getting a value from a request's path params can be done using the following call:
  code-block(:header="false" language="typescript")
    | const param = this.request.getPathParam("param_name");
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts
    |   users_resource.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your resource file. You resource file will check for the <code>:id</code> path param in the request's URL. If it exists and is a <code>number</code>, then it will return what was passed in. If it is <code>NaN</code>, then it will throw a <code>400 Bad Request</code> response.
      code-block(title="/path/to/your/project/users_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | export default class UsersResource extends Drash.Http.Resource {
        | 
        |   static paths = [
        |     "/users/:id"
        |   ];
        | 
        |   public GET() {
        |     const userId = parseInt(this.request.getPathParam("id"));
        | 
        |     if (isNaN(userId)) {
        |       throw new Drash.Exceptions.HttpException(
        |         400,
        |         "This resource requires the `:id` path param to be a number."
        |       );
        |     }
        | 
        |     this.response.body = `You passed in the following user ID as the path param: ${userId}`;
        | 
        |     return this.response;
        |   }
        | 
        | }

      p You can also specify optional parameters by adding <code>?</code>. The resource would still match even if the optional parameters are not passed in. For example:
      code-block(:header="false" language="typescript")
        | static paths = ["/users/:id/:name?"];
        | // or
        | static paths = ["/users/:name?"];
        | // or
        | static paths = ["/users/:id/:name/:age?/:city?"];
      p You can specify as many optional parameters as you want, but required parameters must precede optional parameters. Using the path <code>/users/:id/:name/:age?/:city</code> from the example above, the resource will match for the following URI's:
      ul
        li <code>/users/1/John</code>
        li <code>/users/1/John/</code>
        li <code>/users/1/John/54</code>
        li <code>/users/1/John/54/</code>
        li <code>/users/1/John/54/UK</code>
        li <code>/users/1/John/54/UK/</code>
    li
      p Create your app file.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | import UsersResource from "./users_resource.ts";
        | 
        | const server = new Drash.Http.Server({
        |   response_output: "text/plain",
        |   resources: [UsersResource],
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
      p Using <code>curl</code> (or similar command), make a <code>GET</code> request to <code>localhost:1447/users/1</code>.
      code-block(title="Terminal" language="shell-session")
        | $ curl localhost:1447/users/1
      p You should receive the following response:
      code-block(:header="false" language="shell-session")
        | You passed in the following user ID as the path param: 1
    li
      p Make the same request, but change the <code>:id</code> path param to <code>one</code>.
      code-block(title="Terminal" language="shell-session")
        | $ curl localhost:1447/users/one
      p You should receive the following response:
      code-block(:header="false" language="shell-session")
        | This resource requires the `:id` path param to be a number.
</template>
