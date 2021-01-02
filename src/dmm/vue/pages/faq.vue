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
      base_url: this.$conf.dmm.base_url,
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
  //p
    strong
  //p
  p
    strong Feel free to make suggestions to this page by visiting our
      a(href="https://discord.gg/SgejNXq" target="_blank")  Discord
      | .
</template>
