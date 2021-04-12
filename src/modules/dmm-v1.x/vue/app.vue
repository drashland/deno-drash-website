<script>
import AppRoot from "/assets/common/vue/app_root.vue";

export default {
  components: {
    AppRoot,
  },
  data() {
    return {
      sidebar: {
        base_url: this.$conf.dmm.base_url,
        github_href: "https://github.com/drashland/dmm",
        logo: "/assets/common/img/logo_dmm.svg",
        menus: {
          "Getting Started": {
            Quickstart: "/#quickstart",
            Usage: "/#usage",
            Features: "/#features",
            FAQ: "/faq",
          },
          "Latest News": {},
          Tutorials: {
            "Automate Updating Dependencies": "/tutorials/automate-updating-dependencies"
          },
          "CLI Commands": {
            //Introduction: "/tutorials",
            "check": "/cli-commands/check",
            "help": "/cli-commands/help",
            "info": "/cli-commands/info",
            "update": "/cli-commands/update",
            "version": "/cli-commands/version"
          },
        },
        module: "dmm",
      }
    };
  },
}
</script>

<template lang="pug">
app-root(
  :sidebar="sidebar"
  news_tags="deno, dmm"
  module="dmm"
)
</template>
