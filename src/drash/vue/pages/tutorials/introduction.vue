<script>
import H2Hash from "/common/vue/h2_hash.vue";
import Page from "/common/vue/page.vue";

const title = "Tutorials: Introduction"

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
      title: title
    };
  },
}
</script>

<template lang="pug">
page(
  :title="title"
)
  h2-hash About The Tutorials
  p The tutorials in the sidebar are ordered (from top to bottom) in a way that will help you understand Drash's request-resource-response lifecycle quickly. Since all tutorials have example code of setting up and starting a server, it is not required that you read the tutorials in order. However, it is greatly recommended.
</template>
