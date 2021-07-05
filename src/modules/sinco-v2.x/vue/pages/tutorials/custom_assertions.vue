<script>
const title = "Custom Assertions";

export const resource = {
  paths: [
    "/tutorials/custom-assertions",
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
  p Sinco provides some utility methods that act as wrappers for Deno's <code>std/testing</code> assertions. These methods will run a query on the DOM and make an assertion. You do not need to assert these yourself.
  p The methods it provides are:
  ul
    li <code>assertUrlIs</code> - This will assert that the URL for the page matches a given parameter
    li <code>assertSee</code> - This method will assert that the given text exists inside the page
  p In this tutorial, you will:
  ul
    li Create a headless browser instance;
    li Assert the url for the page; and
    li Assert text exists inside the DOM (page).
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
        | import { buildFor } from "https://deno.land/x/sinco@{{ $conf.sinco.latest_version }}/mod.ts";
        |
        | Deno.test("My web app works as expected", async () => {
        |   const Sinco = await buildFor("chrome");
        |   await Sinco.goTo("https://drash.land");
        |   await Sinco.assertUrlIs("https://drash.land/");
        |   await Sinco.assertSee("Develop With Confidence");
        |   await Sinco.done();
        | })
      p Here you are going to create your headless browser instance, and navigate to <code>https://drash.land</code>. Once the page has loaded, you are going to assert that the page you are on is as expected. You will assert this URL and also assert that you can see some given text on the page, and in this example, it is <code>Develop With Confidence</code>.
  hr
  h2-hash Verification
  ol
    li
      p Run your test.
      code-block(title="Terminal" language="shell-session")
        | $ deno test --allow-run --allow-net app_test.ts
    li
      p All of your tests should pass.
</template>

