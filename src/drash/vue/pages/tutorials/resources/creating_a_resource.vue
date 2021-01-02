<script>
const title = "Creating A Resource";

export const resource = {
  paths: ["/tutorials/resources/creating-a-resource"],
  meta: {
    title: title,
    source_code_uri: "/tutorials/resources/creating_a_resource"
  }
}

export default {
  data() {
    return {
      title: title,
      toc: [
        "Before You Get Started",
        "Creating A Resource",
        "Path Params",
        "Optional Path Params",
        "Regular Expression URIs",
      ]
    };
  },
}
</script>

<template lang="pug">
page(
  :base_url="this.$conf.drash.base_url"
  :title="title",
  :toc="toc"
)
  h2-hash Before You Get Started
  p Drash defines resources according to the MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web" target="_BLANK">https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web</a>
  p Unlike most other frameworks, Drash uses resource classes to handle requests and send responses. So, instead of defining a route with a specific HTTP method (e.g., <code>app.get()</code>), creating a controller class, and mapping that controller class to that route; you create a resource class, define its routes in its <code>paths</code> property, and define its HTTP methods as <code>public</code> functions.
  p You create a resource by extending the <code>Drash.Http.Resource</code> class. This is the base class for all resources. You can define your own base resource class, but it MUST extend the <code>Drash.Http.Resource</code> class.
  p Drash servers only register the resources that are specified in their <code>resources</code> config. In the example code below, the <code>HomeResource</code> class is the only resource that will be regisrered by the server.
  code-block(:header="false" language="typescript" line_highlight="6")
    | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
    | 
    | import HomeResource from "./home_resource.ts";
    | 
    | const server = new Drash.Http.Server({
    |   resources: [HomeResource],
    | });
    | 
    | server.run({
    |   hostname: "localhost",
    |   port: 1447
    | });
  p When Drash servers register resources, they also register their paths as accessible URIs. An accessible URI is a URI that a client can target. In other words, if a resource specifies <code>/my-resource</code> in its <code>paths</code> property, then clients can go to <code>{server-adress.tld}/my-resource</code>.
  p Any URI that does not exist in any resource is a non-accessible URI. Non-accessible URIs ultimately lead to a <code>404 Not Found</code> error response.
  p Adding resources is as simple as importing the resource and adding it to the <code>resources</code> config (see below). The <code>UsersResource</code> class is imported and added to the <code>resources</code> config.
  code-block(:header="false" language="typescript" line_highlight="4,9")
    | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
    | 
    | import HomeResource from "./home_resource.ts";
    | import UsersResource from "./users_resource.ts";
    | 
    | const server = new Drash.Http.Server({
    |   resources: [
    |     HomeResource,
    |     UsersResource
    |   ],
    | });
    | 
    | server.run({
    |   hostname: "localhost",
    |   port: 1447
    | });
  hr
  h2-hash Creating A Resource
  p Take the example below. This resource handles requests at the <code>/</code> URI. If a client makes a request to <code>/</code>, this resource would handle that request.
  code-block(title="/path/to/your/project/home_resource.ts" language="typescript")
    | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
    | 
    | export default class HomeResource extends Drash.Http.Resource {
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
    | }
  h3 Adding More HTTP Methods
  p Giving a resource the ability to handle diffrent types of requests is as easy as adding the HTTP method to handle that request. Taking the above code, you can add more HTTP methods like the ones highlighted below; and your resource would be able to handle those requests.
  code-block(title="/path/to/your/project/home_resource.ts" language="typescript" line_highlight="16-24")
    | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
    | 
    | export default class HomeResource extends Drash.Http.Resource {
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
  p As you can see, the HTTP methods you add and make <code>public</code> in a resource are the HTTP methods clients are allowed to call. If a client tries to make a <code>PATCH</code> request to this resource, it would receive a <code>405 Method Not Allowed</code> error as a response because this resource does not have <code>public PATCH() { ... }</code> defined.
  hr
  h2-hash Path Params
  p Resources are able to specify path params in their paths to allow them to cover multiple endpoints.
  code-block(title="/path/to/your/project/home_resource.ts" language="typescript" line_highlight="5")
    | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
    | 
    | export default class HomeResource extends Drash.Http.Resource {
    |   static paths = [
    |     "/:my_param",
    |   ];
    | 
    |   public GET() {
    |     this.response.body = "GET request received!";
    | 
    |     let myParam = this.request.getPathParam("my_param");
    | 
    |     this.response.body += ` You passed in the following path param: ${myParam}`;
    | 
    |     return this.response;
    |   }
    | }
  p Examples of URIs that this resource would handle:
  ul
    li
      request(method="get" url="/hello")
      | Responds with: Get request received! You passed in the following path param: hello
    li
      request(method="get" url="/world")
      | Responds with: Get request received! You passed in the following path param: world
    li
      request(method="get" url="/something")
      | Responds with: Get request received! You passed in the following path param: something
  hr
  h2-hash Optional Path Params
  p Path parameters can also be optional, allowing a resource to accept a URI that doesn't depend on certain parameters, but still wishes to accept the request, with or without them.
  code-block(title="/path/to/your/project/users_resource.ts" language="typescript" line_highlight="5")
    | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
    | 
    | export default class UsersResource extends Drash.Http.Resource {
    |   static paths = [
    |     "/users/:id/:name?/:age?/:city?",
    |   ];
    | 
    |   public GET() {
    |     this.response.body = "GET request received!";
    | 
    |     const id   = this.request.getPathParam("id");
    |     const name = this.request.getPathParam("name");
    |     const age  = this.request.getPathParam("age");
    |     const city = this.request.getPathParam("city");
    | 
    |     this.response.body += ` You passed in the following path params: |${id}|${name}|${age}|${city}|`;
    | 
    |     return this.response;
    |   }
    | }
  p You can have as many optional parameters as you wish, but required parameters must precede optional parameters.
  P Examples of URIs that this resource would handle:
  ul
    li
      request(method="get" url="/users/1")
      | Responds with: Get request received! You passed in the following path params: |1||||
    li
      request(method="get" url="/users/1/")
      | Responds with: Get request received! You passed in the following path params: |1||||
    li
      request(method="get" url="/users/1/John")
      | Responds with: Get request received! You passed in the following path params: |1|John|||
    li
      request(method="get" url="/users/1/John/")
      | Responds with: Get request received! You passed in the following path params: |1|John|||
    li
      request(method="get" url="/users/1/John/54")
      | Responds with: Get request received! You passed in the following path params: |1|John|54||
    li
      request(method="get" url="/users/1/John/54/")
      | Responds with: Get request received! You passed in the following path params: |1|John|54||
    li
      request(method="get" url="/users/1/John/54/UK")
      | Responds with: Get request received! You passed in the following path params: |1|John|54|UK|
    li
      request(method="get" url="/users/1/John/54/UK/")
      | Responds with: Get request received! You passed in the following path params: |1|John|54|UK|
  hr
  h2-hash Regular Expression URIs
  p Resources are able to specify regular expressions in their paths to allow them to cover multiple endpoints.
  code-block(title="/path/to/your/project/home_resource.ts" language="typescript" line_highlight="5")
    | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
    | 
    | export default class HomeResource extends Drash.Http.Resource {
    |   static paths = [
    |     "/([0-9]$)",
    |   ];
    | 
    |   public GET() {
    |     this.response.body = "GET request received!";
    | 
    |     return this.response;
    |   }
    | }
  p Examples of URIs that this resource would handle:
  ul
    li
      request(method="get" url="/1")
    li
      request(method="get" url="/2")
    li
      request(method="get" url="/3")
    li
      request(method="get" url="/9")
  p This resource would not handle the following URIs because they do not match the regular expression:
  ul
    li
      request(method="get" url="/11")
    li
      request(method="get" url="/12")
    li
      request(method="get" url="/13")
    li
      request(method="get" url="/99")
</template>
