<script>
import AppRoot from "/assets/common/vue/app_root.vue";

export default {
  components: {
    AppRoot,
  },
  data() {
    return {
      sidebar: {
        api_reference_href: "https://doc.deno.land/https/deno.land/x/sinco@" + this.$conf.sinco.latest_version + "/mod.ts",
        base_url: this.$conf.sinco.base_url,
        github_href: "https://github.com/drashland/sinco",
        logo: "/assets/common/img/logo_sinco.svg",
        menus: {
          "Getting Started": {
            Quickstart: "/#quickstart",
            Importing: "/#importing",
            Features: "/#features"
          },
          //"Latest News": {},
          Tutorials: {
            "Creating A Client": "/tutorials/creating-a-client",
            "Click Elements": "/tutorials/clicking-elements",
            "Get And Set Input Value": "/tutorials/get-and-set-input-value",
            "Visit Pages": "/tutorials/visit-pages",
            "Waiting": "/tutorials/waiting",
            "Custom Assertions": "/tutorials/custom-assertions",
            "Evaluate The Page": "/tutorials/evaluate-page",
            "Using Within Docker": "/tutorials/using-within-docker"
          }
        },
        module: "sinco",
      }
    };
  },
}
</script>

<template lang="pug">
app-root(
  :sidebar="sidebar"
  module="sinco"
)
</template>
