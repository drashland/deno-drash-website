<script>
const title = "Evaluate The Page";

export const resource = {
  paths: [
    "/tutorials/evaluate-page",
  ],
  meta: {
    title: title
  }
}

export default {
  components: {
  },
  data() {
    return {
      base_url: this.$conf.sinco.base_url,
      title: title,
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
      ],
    };
  }
}
</script>

<template lang="pug">
page(
  :base_url="base_url"
  :title="title"
  :toc="toc"
)
  h2-hash Before You Get Started
  p Sinco provides the method <code>.evaluatePage()</code> that can run JavaScript against the context of the page.
  p You can pass in a string (<code>.evaluatePage(`1 + 2`)</code>) or a function (<code>.evaluatePage(() => document.title )</code>).
  p Example evaluations could be:
  ul
    li Querying the DOM (getting the child of an element)
    li Returning the page title
    li Adding elements to the page
    li Run equations
    li Anything you could write in a client side JavaScript file or in the console, you can do here!
  p If there was an error with the code you tried to evaluate, Sinco will throw an error.
  p In this tutorial, you will:
  ul
    li Create a headless browser instance; and
    li Go to a website;
    li Gather some information about the page;
    li Run a basic sum;
    li Update the DOM.
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |     app_test.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your test file.
      code-block(title="/path/to/your/project/app_test.ts" language="typescript")
        | import { HeadlessBrowser } from "https://deno.land/x/sinco@{{ $conf.sinco.latest_version }}/mod.ts";
        | import { assertEquals } from "https://deno.land/std@{{ $conf.deno_std.latest_version }}/testing/asserts.ts"
        |
        | Deno.test("My web app works as expected", async () => {
        |   const Sinco = new HeadlessBrowser();
        |   await Sinco.build();
        |   await Sinco.goTo("https://chromestatus.com");
        |   const pageTitle = await Sinco.evaluatePage(() => {
        |     return document.title;
        |   })
        |   const sum = await Sinco.evaluatePage(`1 + 10`);
        |   const oldBodyLength = await Sinco.evaluatePage(() => {
        |     return document.body.children.length;
        |   })
        |   const newBodyLength = await Sinco.evaluatePage(() => {
        |     const p = document.createElement("p");
        |     p.textContent = "Hello world!"
        |     document.body.appendChild(p);
        |     return document.body.children.length;
        |   })
        |   await Sinco.done();
        |   assertEquals(pageTitle, "Chrome Platform Status");
        |   assertEquals(sum, 11);
        |   assertEquals(oldBodyLength, 7);
        |   assertEquals(newBodyLength, 8);
        | })
      p Within the function you can pass to <code>evaluatePage()</code>, you have full access to the DOM, meaning you can write client side JavaScript like you normally would, for example:
      code-block(title="" language="typescript")
        | await Sinco.evaluatePage(() => {
        |   const form = document.querySelector("form");
        |   const submitButton = document.getElementById("submit");
        |   const href = window.location.href;
        |   const savedValue = localStorage.getItem("id");
        | })
      p Here you are going to create your headless browser instance, and navigate to <code>https://chromestatus.com</code>. Once the page has loaded, you will evaluate a few scripts that will get the document title and create a new element on the page. You will then assert that the page title is as expected, and also that a new element was added to the DOM.
    li
      p Create your config
      p A <code>tsconfig.json</code> file is required when targeting the DOM (using document syntax) to tell Deno that this is valid.
      code-block(title="/path/to/your/project/tsconfig.json" language="json")
        | {
        |   "compilerOptions": {
        |     "lib": ["dom", "deno.ns"]
        |   }
        | }
  hr
  h2-hash Verification
  ol
    li
      p Run your test.
      code-block(title="Terminal" language="shell-session")
        | $ deno test --allow-run --allow-net --config tsconfig.json app_test.ts
    li
      p All of your tests should pass.
</template>
