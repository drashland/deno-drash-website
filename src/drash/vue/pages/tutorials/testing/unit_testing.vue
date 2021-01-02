<script>
const title = "Unit Testing";

export const resource = {
  paths: ["/tutorials/testing/unit-testing"],
  meta: {
    title: title,
  }
}

export default {
  data() {
    return {
      title: title,
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Writing Your Tests",
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
  p In this tutorial, you will learn how to test your Drash server and its resources using Deno Standard Modules' <a href="https://github.com/denoland/deno/tree/master/std/testing" target="_BLANK">testing</a> module.
  p This tutorial will cover testing three resources in a single Drash server. Two of the resources will have a <code>database</code> property to simulate querying a database for records.
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |   app.ts
    |   home_resource.ts
    |   orders_resource.ts
    |   run_tests.ts
    |   tests.ts
    |   users_resource.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your <code>HomeResource</code> file.
      code-block(title="/path/to/your/project/home_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        |
        | export default class HomeResource extends Drash.Http.Resource {
        |
        |   static paths = ["/"];
        |
        |   public GET() {
        |     this.response.body = "Welcome home!";
        |     return this.response;
        |   }
        | }
    li
      p Create your <code>OrdersResource</code> file.
      code-block(title="/path/to/your/project/orders_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | export default class OrdersResource extends Drash.Http.Resource {
        | 
        |   static paths = [
        |     "/orders/:id"
        |   ];
        | 
        |   // Simulate a database with order records
        |   protected database: {[key: string]: {
        |       id: number,
        |       name: string,
        |       quantity: number,
        |       price: number
        |     }} = {
        |     "1090987": {
        |       id: 1090987,
        |       name: "Gadgets",
        |       quantity: 50,
        |       price: 1000
        |     },
        |     "8878213": {
        |       id: 8878213,
        |       name: "Gizmos",
        |       quantity: 25,
        |       price: 2000
        |     },
        |   };
        | 
        |   public GET() {
        |     const id = this.request.getPathParam("id");
        |     if (!id) {
        |       throw new Drash.Exceptions.HttpException(400, "`id` parameter must be passed in")
        |     }
        |     this.response.body = this.getOrder(id);
        |     return this.response;
        |   }
        | 
        |   protected getOrder(id: string) {
        |     if (this.database[id]) {
        |       return this.database[id];
        |     }
        | 
        |     throw new Drash.Exceptions.HttpException(404, `Order #${id} not found.`);
        |   }
        | }
    li 
      p Create your <code>UsersResource</code> file.
      code-block(title="/path/to/your/project/users_resource.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | export default class UsersResource extends Drash.Http.Resource {
        | 
        |   static paths = [
        |     "/users/:id"
        |   ];
        | 
        |   // Simulate a database with user records
        |   protected database: {[key: string]: {
        |     id: number,
        |     name: string
        |   }} = {
        |     "1388873": {
        |       id: 1388873,
        |       name: "Seller",
        |     },
        |     "1983765": {
        |       id: 1983765,
        |       name: "Buyer",
        |     },
        |   };
        | 
        |   public GET() {
        |     const id = this.request.getPathParam("id");
        |     if (!id) {
        |       throw new Drash.Exceptions.HttpException(400, "`id` must be passed in")
        |     }
        |     this.response.body = this.getUser(id);
        |     return this.response;
        |   }
        | 
        |   protected getUser(id: string) {
        |     if (this.database[id]) {
        |       return this.database[id];
        |     }
        | 
        |     throw new Drash.Exceptions.HttpException(404, `User #${id} not found.`);
        |   }
        | }
    li
      p Create your <code>app</code> file.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | 
        | import HomeResource from "./home_resource.ts";
        | import OrdersResource from "./orders_resource.ts";
        | import UsersResource from "./users_resource.ts";
        | 
        | const server = new Drash.Http.Server({
        |   response_output: "application/json",
        |   resources: [
        |     HomeResource,
        |     OrdersResource,
        |     UsersResource
        |   ]
        | });
        | 
        | server.run({
        |   hostname: "localhost",
        |   port: 1447
        | });
  hr
  h2-hash Writing Your Tests
  ol
    li
      p Create your test runner file. Your test runner file will import and run your tests. Your server needs to be running so the testing module can make requests to your server using <code>fetch()</code> and receive the responses you expect.
      code-block(title="/path/to/your/project/run_tests.ts" language="typescript")
        | // A single file to run all your tests
        | import "./tests.ts";
    li
      p Write your tests.
      code-block(title="/path/to/your/project/tests.ts" language="typescript")
        | import { assertEquals } from "https://deno.land/std@0.75.0/testing/asserts.ts";
        | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
        | import HomeResource from "./home_resource.ts";
        | import OrdersResource from "./orders_resource.ts";
        | import UsersResource from "./users_resource.ts";
        | 
        | const server = new Drash.Http.Server({
        |   response_output: "application/json",
        |   resources: [
        |       HomeResource,
        |       UsersResource,
        |       OrdersResource
        |   ]
        | });
        | const httpOptions = {
        |   hostname: "localhost",
        |   port: 1447
        | };
        | 
        | Deno.test({
        |   name: "HomeResource - GET /",
        |   async fn(): Promise&lt;void&gt; {
        |     await server.run(httpOptions);
        |     const response = await fetch("http://localhost:1447", {
        |       method: "GET",
        |     });
        |     assertEquals(JSON.parse(await response.text()), "Welcome home!");
        |     server.close()
        |   }
        | });
        | 
        | Deno.test({
        |   name: "UsersResource - GET /users/1",
        |   async fn(): Promise&lt;void&gt; {
        |     await server.run(httpOptions);
        |     const response = await fetch("http://localhost:1447/users/1", {
        |       method: "GET",
        |     });
        |     assertEquals(JSON.parse(await response.text()), "User #1 not found.");
        |     server.close()
        |   }
        | });
        | 
        | Deno.test({
        |   name: "UsersResource - GET /users/1388873",
        |   async fn(): Promise&lt;void&gt; {
        |     await server.run(httpOptions);
        |     const response = await fetch("http://localhost:1447/users/1388873", {
        |       method: "GET",
        |     });
        |     assertEquals(JSON.parse(await response.text()), {
        |       id: 1388873,
        |       name: "Seller",
        |     });
        |     await server.close();
        |   }
        | });
        | 
        | Deno.test({
        |   name: "UsersResource - GET /users/1983765",
        |   async fn(): Promise&lt;void&gt; {
        |     await server.run(httpOptions);
        |     const response = await fetch("http://localhost:1447/users/1983765", {
        |       method: "GET",
        |     });
        |     assertEquals(JSON.parse(await response.text()), {
        |       id: 1983765,
        |       name: "Buyer",
        |     });
        |     server.close()
        |   }
        | });
        | 
        | Deno.test({
        |   name: "OrdersResource - GET /orders/1",
        |   async fn(): Promise&lt;void&gt; {
        |     await server.run(httpOptions);
        |     const response = await fetch("http://localhost:1447/orders/1", {
        |       method: "GET",
        |     });
        |     assertEquals(JSON.parse(await response.text()), "Order #1 not found.");
        |     server.close()
        |   }
        | });
        | 
        | Deno.test({
        |   name: "OrdersResource - GET /orders/1090987",
        |   async fn(): Promise&lt;void&gt; {
        |     await server.run(httpOptions);
        |     const response = await fetch("http://localhost:1447/orders/1090987", {
        |       method: "GET",
        |     });
        |     assertEquals(JSON.parse(await response.text()), {
        |       id: 1090987,
        |       name: "Gadgets",
        |       quantity: 50,
        |       price: 1000
        |     });
        |     server.close()
        |   }
        | });
        | 
        | Deno.test({
        |   name: "OrdersResource - GET /orders/8878213",
        |   async fn(): Promise&lt;void&gt; {
        |     await server.run(httpOptions);
        |     const response = await fetch("http://localhost:1447/orders/8878213", {
        |       method: "GET",
        |     });
        |     assertEquals(JSON.parse(await response.text()), {
        |       id: 8878213,
        |       name: "Gizmos",
        |       quantity: 25,
        |       price: 2000
        |     });
        |     server.close()
        |   }
        | });
    li
      p Run your test runner file.
      code-block(title="Terminal")
        | deno test --allow-net run_tests.ts
      p You should receive the following output:
      code-block(title="Terminal")
        | running 7 tests
        | test HomeResource - GET / ... ok (48ms)
        | test UsersResource - GET /users/1 ... ok (9ms)
        | test UsersResource - GET /users/1388873 ... ok (8ms)
        | test UsersResource - GET /users/1983765 ... ok (7ms)
        | test OrdersResource - GET /orders/1 ... ok (13ms)
        | test OrdersResource - GET /orders/1090987 ... ok (10ms)
        | test OrdersResource - GET /orders/8878213 ... ok (6ms)
        |
        | test result: ok. 7 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (103ms)
