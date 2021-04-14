<script>
const title = "Visit Pages";

export const resource = {
  paths: [
    "/tutorials/visit-pages",
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
  p Sinco provides the method <code>.goTo()</code> that will navigate your browser client to the web page specified. This method will wait until the page has loaded.
  p Example pages could be:
  ul
    li <code>https://github.com</code>
    li <code>www.google.com</code>
  p If there was an error navigating to the page (page doesn't exist), then Sinco will throw an error
  p In this tutorial, you will:
  ul
    li Create a headless browser instance; and
    li Go to a website;
    li Assert the url is correct.
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
        |   await Sinco.goTo("https://chromestatus.com");
        |   await Sinco.assertUrlIs("https://chromestatus.com/features");
        |   await Sinco.done();
        | })
      p Here you are going to create your headless browser instance, and navigate to <code>https://chromestatus.com</code>. Once the page has loaded, you will assert that the url for the page is as expected. Do note that navigating to <code>https://chromestatus.com</code> redirects to <code>https://chromestatus.com/features</code>, which is why the url inside our assertion (<code>assertUrlIs()</code>) is different than the one we passed into <code>goTo()</code>.
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

