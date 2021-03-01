<script>
import AppRoot from "/assets/common/vue/app_root.vue";

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

<style>
    :root {
        --dark-black: #000000de;
        --light-dark: #36304a;
        --bright-white: #f4f4f4;
    }
    /*
     * Change theme of wocket to black and white
    */
    body {
        background-color: var(--dark-black);
        scrollbar-color: var(--bright-white)
    }
    p, h1, h2, h3, h4, h5, li {
        color: var(--bright-white) !important;
    }
    .bg-teal-100 {
        background-color: var(--dark-black);
    }
    div[role="alert"] {
        background-color: var(--dark-black);
    }
    .code-block > pre.header {
        opacity: 87%;
        background: var(--light-dark);
    }
    .code-block > pre.header > .header {
        background: none;
        color: var(--bright-white);
    }
    .code-block > div.code-toolbar > pre {
        background-color: var(--dark-black);
        border-color: var(--bright-white);
    }
    .sidebar {
        background-color: var(--dark-black);
        border-color: var(--light-dark);
    }
    .sidebar .menu-name {
        background-color: var(--light-dark);
    }
    .sidebar .menu-name + ul .menu-item {
        background-color: var(--dark-black);
    }
    .sidebar .menu-name + ul .menu-item:hover {
        background-color: var(--bright-white);
        color: var(--dark-black);
    }
    #current_version_item {
        opacity: 87%;
        color: var(--dark-black);
    }
    .version-menu {
        opacity: 87%;
    }
    hr  {
        border-color: var(--light-dark);
    }
</style>

<template lang="pug">
app-root(
  :sidebar="sidebar"
  module="Wocket"
)
</template>
