<script>
export const resource = {
  paths: [
    "/tutorials/middleware/adding-server-level-middleware"
  ],
  meta: {
    title: "Adding Server-Level Middleware",
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
  p Server-level middleware is middleware that is executed by the server on <strong><em>every</em></strong> request.
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts
    |   home_resource.ts
    |   verify_token_middleware.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your resource file.
      code-block(title="/path/to/your/project/home_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | export default class HomeResource extends Drash.Http.Resource {
        | 
        |   static paths = ["/"];
        | 
        |   public GET() {
        |     this.response.body = {
        |       method: "GET",
        |       body: "Hello!"
        |     };
        |     return this.response;
        |   }
        | }
    li
      p Create your middleware file. This middleware file takes in the <code>request</code> and <code>response</code> params.
      code-block(title="/path/to/your/project/verify_token_middleware.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | export default function VerifyTokenMiddleware(
        |   request: Drash.Http.Request,
        |   response?: Drash.Http.Response
        | ): void {
        |   let token = request.getUrlQueryParam('super_secret_token');
        | 
        |   if (!token) {
        |     throw new Drash.Exceptions.HttpMiddlewareException(400, "Where is the token?");
        |   }
        | 
        |   if (token != "AllYourBaseAreBelongToUs") {
        |     throw new Drash.Exceptions.HttpMiddlewareException(403, `Mmm... "${token}" is a bad token.`);
        |   }
        | }
      p Your middleware will check if <code>super_secret_token</code> was passed in the request's URL. If not, then a <code>400</code> error will be thrown. It will also check if the value of <code>super_secret_token</code> is <code>AllYourBaseAreBelongToUs</code>. If not, then a <code>403</code> error will be thrown.
    li
      p Create your app file.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | import HomeResource from "./home_resource.ts";
        | import VerifyTokenMiddleware from "./verify_token_middleware.ts";
        | 
        | const server = new Drash.Http.Server({
        |   middleware: {
        |     before_request: [
        |       VerifyTokenMiddleware
        |     ]
        |   },
        |   resources: [
        |     HomeResource
        |   ],
        |   response_output: "application/json",
        | });
        | 
        | server.run({
        |   hostname: "localhost",
        |   port: 1447
        | });

  hr
  h2-hash Verification
  p You can verify that your app's code works by making requests like the ones below. Since this tutorial's app sets <code>application/json</code> as the <code>response_output</code>, the server responds to requests with JSON by default.
  ol
    li
      p Run your app.
      code-block(title="Terminal" language="shell-session")
        | $ deno run --allow-net app.ts
    li
      p Make a request using <code>curl</code> like below or go to <code>localhost:1447/</code> in your browser.
      code-block(title="Terminal" language="shell-session")
        | $ curl localhost:1447/
      p <code>VerifyTokenMiddleware</code> is run on every request because it was specified as server-level middleware. This request is missing the <code>super_secret_token</code> query param; therefore, you should receive the following response:
      code-block(:header="false")
        | "Where is the token?"
    li
      p Make the same request with a bad token.
      code-block(title="Terminal" language="shell-session")
        | $ curl localhost:1447/?super_secret_token=IsThisIt
      p You should receive the following response:
      code-block(:header="false")
        | "Mmm... \"IsThisIt\" is a bad token."
    li
      p Make the same request with the expected token.
      code-block(title="Terminal" language="shell-session")
        | $ curl localhost:1447/?super_secret_token=AllYourBaseAreBelongToUs
      p You should receive the following response (we pretty-printed the response for you):
      code-block(language="json" :header="false")
        | {
        |   "method": "GET",
        |   "body": "Hello!"
        | }
</template>
