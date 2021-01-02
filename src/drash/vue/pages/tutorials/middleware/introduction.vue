<script>
export const resource = {
  paths: [
    "/tutorials/middleware/introduction"
  ],
  meta: {
    title: "Introduction To Middleware",
  }
}

export default {
  data() {
    return {
      title: resource.meta.title,
      toc: [
        "Basics",
        "Server-Level Middleware",
        "Resource-Level Middleware",
        "Setting The Execution Point",
        "Sorting Middleware",
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
  h2-hash Basics
  p Drash defines middleware according to the MDN: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Middleware" target="_BLANK">https://developer.mozilla.org/en-US/docs/Glossary/Middleware</a>.
  p Adding middleware to your application is useful when you want to:
  ul
    li filter requests;
    li process/manipulate request data; and/or
    li process/manipulate response data.
  p There are two main types of middleware in Drash: server-level middleware and resource-level middleware.
  p Middleware is executed throughout the request-resource-response lifecycle. Read the <a :href="$conf.drash.base_url + '/#/tutorials/middleware/introduction#setting-the-execution-point'">Setting The Execution Point</a> section below for more information on middleware execution points. You can also view the <a :href="$conf.drash.base_url + '/#/lifecycle-diagram'">Lifecycle Diagram</a> for a visual representation of where middleware is executed in the request-resource-response lifecycle.
  hr
  h2-hash Server-Level Middleware
  p Server-level middleware is middleware executed by the server on every request. You define server-level middleware when you create your server object. Server-level middleware can be executed at the following points in the request-resource-response lifecycle:
  ul
    li when the server starts;
    li before the request is made;
    li after the request is matched to a resource; and
    li after the request is made.
  p Take the example below. There is a set of server-level middleware that will execute throughout the request-resource-response lifecycle.
  ul
    li <code>ServeTypeScript</code> executes at compile time
    li <code>Auth</code> executes before each request is made
    li <code>TemplateEngine</code> executes after a request is matched to a resource
    li <code>CleanUpData</code> executes after each request is made
  code-block(:header="false" language="typescript" line_highlight="2-15")
    | const server = new Drash.Http.Server({
    |   middleware: {
    |     compile_time: [
    |       ServeTypeScript,
    |     ],
    |     before_request: [
    |       Auth,
    |     ],
    |     after_resource: [
    |       TemplateEngine,
    |     ],
    |     after_request: [
    |       CleanUpData,
    |     ]
    |   },
    |   resources: [
    |     HomeResource
    |   ],
    |   response_output: "application/json",
    | });

  hr
  h2-hash Resource-Level Middleware
  p Unlike server-level middleware, resource-level middleware is specified using <a href="https://www.typescriptlang.org/docs/handbook/decorators.html" target="_BLANK">decorators</a> and a <code>tsconfig.json</code> file. Resource-level middleware can only be executed by resources. That is, if a resource is decorated with middleware, then the middleware specified in the decorators will be executed.
  p Take the example below. This resource contains two types of resource-level middleware &mdash; class level and HTTP method level. With resource-level middleware, you can specify middleware to be more granular by decorating only HTTP methods or the resource class itself.
  code-block(:header="false" language="typescript" line_highlight="1-4,11-14")
    | @Drash.Http.Middleware({
    |   before_request: [VerifyTokenMiddleware],
    |   after_request: []
    | })
    | export default class SecretResource extends Drash.Http.Resource {
    | 
    |   static paths = [
    |     "/secret"
    |   ];
    | 
    |   @Drash.Http.Middleware({
    |     before_request: [LogAccessMiddleware],
    |     after_request: []
    |   })
    |   public GET() {
    |     this.response.body = {
    |       method: "GET",
    |       body: "You have accessed the secret resource!"
    |     };
    |     return this.response;
    |   }
    | }
  hr
  h2-hash Setting The Execution Point
  p There are four points where middleware is executed:
  ul
    li when the server starts;
    li before the request is made;
    li after the request is matched to a resource; and
    li after the request is made.
  h3#before-the-request Compile Time
  p Middleware executed at compile time means it is executed when the server is starting up. Compile time middleware is useful if you want to process data at compile time and use that data at runtime &mdash; keeping your server's performance up.
  h3#before-the-request Before The Request
  p Middleware executed before the request means it is executed before a resource's HTTP method (e.g., <code>MyResource.GET()</code>, <code>MyResource.POST()</code>, <code>MyResource.DELETE()</code>) is called.
  h3#after-resource After Request Is Matched To Resource
  p Middleware executed after a request is matched to a resource means it is executed immediately after the server figures out what resource will handle the request based on its URI.
  h3#after-the-request After The Request
  p Middleware executed after the request means it is executed immediately after a resource's HTTP method (e.g., <code>MyResource.GET()</code>, <code>MyResource.POST()</code>, <code>MyResource.DELETE()</code>) is called and before a response is sent to the client that made the request.
  h3#setting-the-execution-point-of-server-level-middleware Setting The Execution Point Of Server-Level Middleware
  p You can have server-level middleware execute at compile time, before the request, after a request is matched to a resource, and after a request by placing your middleware in the appropriate array. See the example below to see middleware defined in these arrays.
  code-block(:header="false" language="typescript" line_highlight="3,6,9,12")
    | const server = new Drash.Http.Server({
    |   middleware: {
    |     compile_time: [
    |       ServeTypeScript,
    |     ],
    |     before_request: [
    |       Auth,
    |     ],
    |     after_resource: [
    |       TemplateEngine,
    |     ],
    |     after_request: [
    |       CleanUpData,
    |     ]
    |   },
    |   resources: [
    |     HomeResource
    |   ],
    |   response_output: "application/json",
    | });

  h3#setting-the-execution-point-of-resource-level-middleware Setting The Execution Point Of Resource-Level Middleware
  p You can have resource-level middleware execute before and after the request by placing your middleware in the appropriate array in your resource class' middleware decorators.  See the example below to see middleware defined in these arays.
  code-block(:header="false" language="typescript" line_highlight="2,3,12,13")
    | @Drash.Http.Middleware({
    |   before_request: [VerifyTokenMiddleware],
    |   after_request: []
    | })
    | export default class SecretResource extends Drash.Http.Resource {
    | 
    |   static paths = [
    |     "/secret"
    |   ];
    | 
    |   @Drash.Http.Middleware({
    |     before_request: [LogAccessMiddleware],
    |     after_request: []
    |   })
    |   public GET() {
    |     this.response.body = {
    |       method: "GET",
    |       body: "You have accessed the secret resource!"
    |     };
    |     return this.response;
    |   }
    | }


  hr
  h2-hash Sorting Middleware
  p Middleware is executed in the order you define them. Take the examples below.
  p The following server-level middleware would execute in the following order:
  ul
    li <code>OneMiddleware</code>
    li <code>TwoMiddleware</code>
  code-block(:header="false" language="typescript" line_highlight="4-5")
    | const server = new Drash.Http.Server({
    |   middleware: {
    |     before_request: [
    |       OneMiddleware,
    |       TwoMiddleware
    |     ]
    |   },
    |   resources: [
    |     HomeResource
    |   ],
    |   response_output: "application/json",
    | });

  p The following resource-level middleware would execute in the following order:
  ul
    li <code>RedMiddleware</code>
    li <code>BlueMiddleware</code>
  code-block(:header="false" language="typescript" line_highlight="3-4")
    | @Drash.Http.Middleware({
    |   before_request: [
    |     RedMiddleware,
    |     BlueMiddleware
    |   ]
    | })
    | export default class HomeResource extends Drash.Http.Resource {
    | 
    |   static paths = [
    |     "/"
    |   ];
    | 
    |   public GET() {
    |     this.response.body = "GET request received!";
    |     return this.response;
    |   }
    | }


</template>
