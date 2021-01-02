<script>
export const resource = {
  paths: ["/tutorials/error-handling/angular-deep-linking"],
  meta: {
    title: "Angular Deep Linking",
  }
}

export default {
  data() {
    return {
      title: resource.meta.title,
      toc: [
        "Before You Get Started",
        "Steps",
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
  p This tutorial assumes you have a working Angular app stacked with Deno and Drash.
  p This tutorial solves the issue commonly surfaced from <a href="https://angular.io/guide/deployment#server-configuration" target="_BLANK">https://angular.io/guide/deployment#server-configuration</a>.
  p In order to solve the issue, you have to override <code>Drash.Http.Server</code> and override its <code>handleHttpRequestError()</code> method.
  hr
  h2-hash Steps
  ol
    li 
      p Create your <code>app.ts</code> file. Take note of the highlighted code. This code will help your Angular app by serving your default <code>index.html</code> file. Your default <code>index.html</code> file is the one you define for your Angular app. If a deep link is used, Drash will throw a <code>404</code> error in your Angular app. By adding the highlighted code, you tell Drash to reroute back to your Angular app's <code>index.html</code> file on <code>404</code> errors.
      p
        code-block(title="/path/to/your/project/app.ts" language="typescript" line_highlight="25-28")
          | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
          | const decoder = new TextDecoder();
          |
          | // Define your custom Angular server
          | class AngularServer extends Drash.Http.Server {
          |   public handleHttpRequestError(
          |     request: Drash.Http.Request,
          |     error: Drash.Exceptions.HttpException,
          |     resource: Drash.Http.Resource | null = null,
          |     response: Drash.Http.Response | null = null,
          |   ): Promise&lt;Drash.Interfaces.ResponseOutput&gt; {
          | 
          |     if (resource) {
          |       if (!response) {
          |         if (typeof resource[request.method.toUpperCase()] !== "function") {
          |           error = new Drash.Exceptions.HttpException(405);
          |         }
          |       }
          |     }
          | 
          |     response = new Drash.Http.Response(request);
          |     response.status_code = error.code ? error.code : null;
          |     response.body = error.message ? error.message : response.getStatusMessage();
          | 
          |     if (response.status_code == 404) {
          |       response.headers.set("Content-Type", "text/html");
          |       response.body = new TextDecoder().decode(Deno.readFileSync("./path/to/your/index.html"));
          |     }
          | 
          |     try {
          |       this.executeMiddlewareServerLevelAfterRequest(request, null, response);
          |     } catch (error) {
          |       // Do nothing
          |     }
          | 
          |     return response.send();
          |   }
          | }
          |
          | // Use your Angular server as the Drash.Http.Server
          | Drash.Http.Server = AngularServer;
          | 
          | // Create your resource
          | export class AngularResource extends Drash.Http.Resource {
          |   static paths = ["/"];
          |   public GET() {
          |     try {
          |       const raw = Deno.readFileSync("./path/to/your/index.html");
          |       const template = decoder.decode(raw);
          |       this.response.body = template;
          |     } catch (error) {
          |       throw new Drash.Exceptions.HttpException(400, "index error");
          |     }
          |     return this.response;
          |   }
          | }
          |
          | // Create your server
          | const server = new Drash.Http.Server({
          |   response_output: "text/html",
          |   resources: [AngularResource],
          |   directory: `${await Deno.realpath(".")}`,
          |   static_paths: ["/public"],
          | });
          |
          | // Run your server
          | server.run({
          |   hostname: "localhost",
          |   port: 1447
          | });
</template>
