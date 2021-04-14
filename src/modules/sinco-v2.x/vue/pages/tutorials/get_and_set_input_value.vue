<script>
const title = "Get And Set Input Value";

export const resource = {
  paths: [
    "/tutorials/get-and-set-input-value",
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
  p Sinco provides a method to get the value associated with an <code>input</code> element that is present on the page.
  p Sinco provides another method for setting the value of an <code>input</code> element by a selector.
  p In this tutorial, you will:
  ul
    li Create a headless browser instance;
    li Set the value for an input element;
    li Get the value associated with a specific input element; and
    li Assert that value is correct.
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
        | import { assertEquals } from "https://deno.land/std@{{ $conf.deno_std.latest_version }}/testing/asserts.ts";
        |
        | Deno.test("My web app works as expected", async () => {
        |   const Sinco = await buildFor("chrome");
        |   await Sinco.goTo("https://chromestatus.com");
        |   await Sinco.type('input[placeholder="Filter"]', "hello world");
        |   const val = await Sinco.getInputValue('input[placeholder="Filter"]');
        |   assertEquals(val, "hello world");
        |   await Sinco.done();
        | })
      p In this tutorial, you are creating a new browser instance that is pointing to <code>https://chromestatus.com</code>, then you will type a value into an input field, just so the field is populated with a value. After, you will get the value from that input field and assert it equals the value you typed.
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

