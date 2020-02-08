<script>
export const resource = {
  paths: ["/dependency-management"],
  meta: {
    title: "Dependency Management",
  }
}

export default {
  data() {
    return {
      example_code: this.$app_data.example_code['/src/example_code/dependency_management'],
      toc: {
        items: [
          "Before You Get Started",
          "Loading Dependencies",
        ]
      }
    };
  },
}
</script>

<template lang="pug">
page-tutorial(
  :toc="toc"
)
  div.row
    div.col
      hr
      h2-hash Before You Get Started
      p This pages serves as an addendum to <a href="https://deno.land/std/manual.md#linking-to-third-party-code" target="_BLANK">Linking to third party code</a> in Deno's <a href="https://deno.land/std/manual.md" target="_BLANK">Manual</a>.
      p This page will take Drash's dependency management file (<a href="https://github.com/drashland/deno-drash/blob/master/deps.ts" target="_BLANK"><code>deps.ts</code></a>) to drive the information on this page.
  div.row
    div.col
      hr
      h2-hash Loading Dependencies
      p As you can see below, Drash's <code>deps.ts</code> file contains many <code>export</code> statements. These statements allow Drash's source code to <code>import</code> any module that is exported from this file.
      p
        code-block-slotted(language="typescript")
          template(v-slot:title) deps.ts
          template(v-slot:code)
            | {{ example_code.deps.contents }}
      p For example, Drash's <code>response.ts</code> file requires some dependencies. Instead of grabbing dependencies directly from a URL, it references the <code>deps.ts</code> file &mdash; allowing it to use the same dependencies that other files in Drash are allowed to use. Some concerns regarding this method as a dependency management tool are addressed in <a href="https://deno.land/std/manual.md#linking-to-third-party-code" target="_BLANK">Linking to third party code</a> in Deno's <a href="https://deno.land/std/manual.md" target="_BLANK">Manual</a>.
      p
        code-block-slotted(language="typescript")
          template(v-slot:title) response.ts
          template(v-slot:code)
            | {{ example_code.response.contents }}
      p A very important task you must take on when handling your dependencies is writing tests for all of your core logic. That is at the very least. Drash, for example, has unit tests that ensure different types of servers (e.g., servers with/without middleware, servers with different HTTP methods, etc.) can be created, pinged, and send responses accordingly. This is how Drash maintains upgrading its dependecies without issues. If there is an issue, it is easily identified and fixed before a new release is made.
      p So, please make sure you test your code. Drash tries to keep up with Deno's latest versions, but there are many breaking changes and not all changes are caught. This is especially true for edge cases that have yet to be found.
</template>
