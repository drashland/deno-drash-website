<script>
const title = "Clicking Elements";

export const resource = {
  paths: [
    "/tutorials/clicking-elements",
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
  p Sinco provides the method <code>.click()</code> that will allow you to click any element on the page by the given selector.
  p Example selectors could be:
  ul
    li <code>.click('a[href="/user"]');</code>
    li <code>.click('button#submit');</code>
  p The <code>.click()</code> method will take any valid selector.
  p If there is any problem with clicking an element by the selector, such as the element not existing, Sinco will throw an error for you.
  p In this tutorial, you will:
  ul
    li Create a headless browser instance; and
    li Click a link;
    li Assert the page was changed.
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
        |   await Sinco.click('a[href="/features/schedule"]');
        |   await Sinco.waitForPageChange();
        |   await Sinco.assertUrlIs("https://chromestatus.com/features/schedule");
        |   await Sinco.done();
        | })
      p Here you are going to create your headless browser instance, and navigate to <code>https://chromestatus.com</code>. Once the page has loaded, you will click an element matching the <code>a[href="/features/schedule"]</code> selector, which will send you to a different page. To assert this, you are going to use <code>.assertUrlIs()</code> to assert the page you are currently on, has now changed.
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

