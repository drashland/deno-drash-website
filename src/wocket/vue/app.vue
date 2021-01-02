<script>
import AppRoot from "/common/vue/app_root.vue";

export default {
  components: {
    AppRoot,
  },
  data() {
    return {
      sidebar: {
        api_reference_href: "https://doc.deno.land/https/deno.land/x/wocket@" + this.$conf.wocket.latest_version + "/mod.ts",
        base_url: this.$conf.wocket.base_url,
        github_href: "https://github.com/drashland/wocket",
        logo: "/assets/common/img/logo_wocket.svg",
        menus: {
          "Getting Started": {
            Quickstart: "/#quickstart",
            Importing: "/#importing",
            Features: "/#features",
          },
          Tutorials: {
            Introduction: "/tutorials/introduction",
            "Creating a Server": "/tutorials/creating-a-server",
            "Opening Channels": "/tutorials/opening-channels",
            "Closing Channels": "/tutorials/closing-channels",
            "Adding Clients To Channels": "/tutorials/adding-clients-to-channels",
            "Removing Clients From Channels": "/tutorials/removing-clients-from-channels",
            "Sending to Specific Clients": "/tutorials/sending-to-specific-clients",
            "Reserved Event Names": "/tutorials/reserved-event-names"
          },
          "Advanced Tutorials": {
            Introduction: "/advanced-tutorials/introduction",
            "Creating A Chat App": {
              Introduction: "/advanced-tutorials/creating-a-chat-app/introduction",
              "Part 1: Creating The Server": "/advanced-tutorials/creating-a-chat-app/part-1",
              "Part 2: Opening A Channel": "/advanced-tutorials/creating-a-chat-app/part-2",
              "Part 3: Creating The Front-End": "/advanced-tutorials/creating-a-chat-app/part-3",
            }
          },
        },
        module: "wocket",
      }
    };
  },
}
</script>

<template lang="pug">
app-root(
  :sidebar="sidebar"
  module="Wocket"
)
</template>
