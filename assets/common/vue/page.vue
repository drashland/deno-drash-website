<template lang="pug">
div
  h1.text-5xl {{ title }}
  h2.mb-5.text-4xl(v-if="subtitle") {{ subtitle }}
  div(v-if="toc")
    hr
    h2-hash Table Of Contents
    ul.mb-5
      li(v-for="item in toc")
        a(:href="base_url + '/#' + $route.path + '#' + normalizeHref(item)") {{ item }}
  hr
  slot
</template>

<script>
import H2Hash from "/common/vue/h2_hash.vue";

export default {
  components: {
    H2Hash
  },
  props: {
    base_url: {
      type: String,
    },
    subtitle: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    toc: {
      type: Array,
      required: false,
    },
  },
  methods: {
    normalizeHref(item) {
      item = item
        .replace(/ /g, '-')
        .replace(/\?/g, "")
        .replace(/\,/g, "");
      return item.toLowerCase();
    }
  }
};
</script>
