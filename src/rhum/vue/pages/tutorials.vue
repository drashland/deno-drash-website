<script>
import H2Hash from "/common/vue/h2_hash.vue";
import Page from "/common/vue/page.vue";

const title = "Tutorials: Introduction";

export const resource = {
  paths: [
    "/tutorials",
    "/tutorials/introduction"
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
  h2-hash About The Tutorials
  p The tutorials in the sidebar are ordered (from top to bottom) to help you understand Rhum quickly. Since all tutorials have example code of setting up tests, it is not required that you read the tutorials in order. However, it is greatly recommended.
</template>
