<script>
import AppRoot from "/assets/common/vue/app_root.vue";
import { selectedVersion } from "/assets/common/js/util.js"

export default {
  components: {
    AppRoot,
  },
  data() {
    return {
      sidebar: {
        api_reference_href: "https://doc.deno.land/https/deno.land/x/line@" + this.$conf.line.latest_version + "/mod.ts",
        base_url: "/line/" + selectedVersion(),
        github_href: "https://github.com/drashland/line",
        logo: "/assets/common/img/logo_line.svg",
        menus: {
          "Getting Started": {
            Quickstart: "/#quickstart",
            Importing: "/#importing",
            Features: "/#features"
          },
          //"Latest News": {},
          Tutorials: {
            
          }
        },
        module: "line",
      }
    };
  },
}
</script>

<template lang="pug">
app-root(
  :sidebar="sidebar"
  module="line"
)
</template>
