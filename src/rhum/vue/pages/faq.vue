<script>
import H2Hash from "/common/vue/h2_hash.vue";
import Page from "/common/vue/page.vue";

const title = "FAQ";

export const resource = {
  paths: [
    "/faq",
  ],
  meta: {
    title: title
  }
}

export default {
  components: {
    H2Hash,
    Page,
  },
  data() {
    return {
      base_url: this.$conf.rhum.base_url + "/#",
      title: title,
    };
  }
}
</script>

<template lang="pug">
page(
  :base_url="base_url"
  :title="title"
)
  p
    strong Why does the CI show a different output than my host machine?
  p Due to the trouble with modifying the output of tests, you will notice the output of your tests in your CI is different than what you see when running tests on your host machine. This is expected. The CI does not like how Rhum changes the way <code>Deno.test</code> outputs results in a prettier manner. So, to make the output readable in the CI, Rhum has to implement a different output method &mdash; having the test plans, suites, and cases display on a single line.
</template>
