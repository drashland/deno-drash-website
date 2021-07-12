<script>
const title = "CSRF Protected Pages";

export const resource = {
  paths: [
    "/tutorials/csrf-protected-pages",
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
  p Sinco provides a method <code>setCookie()</code> that can be used to set a cookie for the page. This can aid in setting a CSRF token before you access a 'protected' resource. Protected in this sense means that the resource expects the request to have a CSRF token. If it doesn't it will most likely respond with a 403 (forbidden) status code.
  p In this tutorial, you will:
  ul
    li Create both a headless browser instance for Chrome; and
    li Set a cookie on the current page;
    li Navigate to a new page;
    li Assert that the token you set is still present on the new page.
  hr
  folder-structure-end-state
    | ▾ /path/to/your/project/
    |     app.ts
  hr
  h2-hash Steps
  ol
    li
      p Create your file.
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { assertEquals } from "https://deno.land/std@{{ $conf.deno_std.latest_version }}/testing/asserts.ts";
        | import { buildFor } from "https://deno.land/x/sinco@{{ $conf.sinco.latest_version }}/mod.ts";
        | // In this example, we're going to use Chrome, but should you wish to use
        | // Firefox, just replace the `"chrome"` param for `buildFor()` with `"firefox"`.
        | Deno.test("Can set cookies and pass them around", async () => {
        |   const Chrome = await buildFor("chrome");
        |   await Chrome.goTo("https://drash.land");
        |   // Now here, you are going to define the name, value and domain for your token.
        |   await Chrome.setCookie("X-CSRF-TOKEN", "I am the token", "https://drash.land");
        |   await Chrome.goTo("https://drash.land/drash/v1.x/#/");
        |   const cookieResult = await Chrome.evaluatePage(`document.cookie`);
        |   await Chrome.done(); // Always close before asserting where possible, so the process doesn't continue if an assertion throws an error.
        |   assertEquals(cookieResult, "X-CSRF-TOKEN=I am the token");
        | })
      p Here you are going to create your headless browser instance for Chrome. Navigate to https://drash.land, set a cookie on the page, navigate to a different page of the drash.land domain, and assert that the cookie is still present.
      p Alternatively, this approach might work better if you have a page that provides the token to you:
      code-block(title="/path/to/your/project/app.ts" language="typescript")
        | import { assertEquals } from "https://deno.land/std@{{ $conf.deno_std.latest_version }}/testing/asserts.ts";
        | import { buildFor } from "https://deno.land/x/sinco@{{ $conf.sinco.latest_version }}/mod.ts";
        | const Chrome = await buildFor("chrome");
        | await Chrome.goTo("http://localhost:1445/"); // Assume you have a web server running, and `/` set a X-CSRF-TOKEN cookie.
        | await Chrome.goTo("http://localhost:1445/users"); // A resource that expects the token
        | const result = await Chrome.evaluatePage(() => {
        |   // Here, maybe you would want to assert that you don't see a 'forbidden error' message,
        |   // or that your view displays correctly when authorised.
        | });
        | await Chrome.done();
        | assertEquals(result, "What you expect here");
  hr
  h2-hash Verification
  ol
    li
      p Run your file.
      code-block(title="Terminal" language="shell-session")
        | $ deno test --allow-run --allow-net --allow-read app.ts
</template>