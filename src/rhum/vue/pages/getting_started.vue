<script>
import H2Hash from "/common/vue/h2_hash.vue";
import CodeBlock from "/common/vue/code_block.vue";
import CodeBlockImport from "/common/vue/code_block_import.vue";
import IntroductionHeader from "/common/vue/introduction_header.vue";

export const resource = {
  paths: ["/", "/introduction"],
  meta: {
    title: "Introduction",
  }
}

export default {
  components: {
    H2Hash,
    CodeBlock,
    CodeBlockImport,
    IntroductionHeader,
  },
}
</script>

<template lang="pug">
div
  introduction-header(heading="Rhum" description="Rhum is a lightweight testing framework for Deno")
  div.flex.mb-5
    a(href="https://github.com/drashland/rhum/releases" target="_BLANK")
      img.mr-1(alt="Latest Rhum Release" src="https://img.shields.io/github/release/drashland/rhum.svg?color=brightgreen&label=Latest" width="auto" height="20")
    a(href="https://github.com/drashland/rhum/actions" target="_BLANK")
      img.mr-1(alt="Rhum CI" src="https://img.shields.io/github/workflow/status/drashland/rhum/master?label=CI" width="auto" height="20")
    a(href="https://discord.gg/SgejNXq" target="_BLANK")
      img.mr-1(alt="Drash Land Discord" src="https://img.shields.io/badge/Chat-on%20Discord-blue")
    a(href="https://twitter.com/drash_land" target="_BLANK")
      img.mr-1(alt="Drash Land Twitter" src="https://img.shields.io/twitter/url?label=%40drash_land&style=social&url=https%3A%2F%2Ftwitter.com%2Fdrash_land" width="auto" height="20")
    a(href="https://www.youtube.com/watch?v=WhG5hLrcaVQ&list=PLlFUbR9MhiNU9VlCi97JkahXyDYcL_vUz&ab_channel=drashland" target="_BLANK")
      img(alt="Rhum YouTube" src="https://img.shields.io/badge/Tutorials-YouTube-red" width="auto" height="20")
  div
    hr
    h2-hash Quickstart
    ol
      li
        p Write your test file.
        code-block(title="test.ts" language="typescript")
          | import { Rhum } from "https://deno.land/x/rhum@{{ $conf.rhum.latest_version }}/mod.ts";
          |
          | let value = false;
          |
          | function run() {
          |   return true;
          | }
          |
          | async function close() {
          |   value = true;
          |   return value;
          | }
          |
          | // 1. Define your test plan (usually the test file's name)
          | // 2. Define your test suites (usually methods being tested)
          | // 3. Define your test cases with assertions
          | Rhum.testPlan("app_test.ts", () => {
          |   Rhum.testSuite("run()", () => {
          |     Rhum.testCase("Returns true", () => {
          |       const result = run();
          |       Rhum.asserts.assertEquals(true, result);
          |     });
          |   });
          |   Rhum.testSuite("close()", () => {
          |     Rhum.testCase("Returns true", async () => {
          |       const result = await close();
          |       Rhum.asserts.assertEquals(true, result);
          |     });
          |   });
          | });
          |
          | Rhum.run(); // <-- make sure to include this so that your tests run via `deno test`
      li
        p Run your tests.
        code-block(title="Terminal" language="shell-session")
          | $ deno test --allow-env
      li
        p View your output.
        code-block(title="Terminal" language="shell-session")
          | app_test.ts
          |     run()
          |         Returns true ... ok (4ms)
          |     close()
          |         Returns true ... ok (1ms)
    hr
    h2-hash Importing
    code-block-import(name="Rhum" repo="rhum" :version="$conf.rhum.latest_version")
    hr
    h2-hash Features
    ul
      li
        p Descriptive naming for your tests
      li
        p Lightweight
      li
        p Zero dependencies
      li
        p Simple and easy to use
      li
        p Asynchronous support
      li
        p Still uses <code>Deno.test</code> under the hood
      li
        p Skip functionality
      li
        p Mock requests
      li
        p Hooks
    hr
    h2-hash Articles
    ul
      li
        a(href="https://dev.to/crookse_/why-we-created-rhum-for-testing-deno-projects-33mf") Why We Created Rhum
</template>
