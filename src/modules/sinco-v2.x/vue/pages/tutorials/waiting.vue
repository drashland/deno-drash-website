<script>
const title = "Waiting";

export const resource = {
  paths: [
    "/tutorials/waiting",
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
  p Sinco provides methods to wait in specific scenarios, such as waiting for the page to change after clicking a button, or waiting for an anchor change on the uri. These help in ensuring your following code matches what the page should be, so say for example, you click a button that changes the page after 5 seconds. The <code>waitForPageChange()</code> method will wait for this, so your other actions and assertions aren't trying to run whilst the new page hasn't loaded yet.
  p The following methods Sinco provides are:
  ul
    li <code>waitForPageChange()</code>
  p The <code>waitForPageChange()</code> method will wait for the page to change, eg clicking an anchor tag that directs the user to a new uri.
  p In this tutorial, you will:
  ul
    li Create a headless browser instance; and
    li Go to a website;
    li Wait for the page to change on a click;
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
        | Deno.test("My web app works as expected", async function () {
        |   const Sinco = await buildFor("chrome");
        |   await Sinco.goTo("https://chromestatus.com");
        |   await Sinco.assertUrlIs("https://chromestatus.com/features");
        |   await Sinco.click('a[href="/features/schedule"]');
        |   await Sinco.waitForPageChange();
        |   await Sinco.assertUrlIs("https://chromestatus.com/features/schedule");
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

