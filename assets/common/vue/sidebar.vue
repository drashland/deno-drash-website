<script>
export default {
  props: {
    api_reference_href: {
      type: String,
      required: false,
    },
    base_url: {
      type: String,
      required: true,
    },
    github_href: {
      type: String,
      required: true,
    },
    menus: {
      type: Object,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    module: {
      type: String,
      required: true,
    },
    styles: {
      type: Object,
      default: () => {
        return {
          background_color: "#282633"
        }
      }
    }
  },
  data() {
    return {
      version_selector_is_active: false,
      versions: this.$conf[this.module].versions,
    };
  },
  computed: {
    current_version() {
      return window.location.href
        .match(/v[0-9].+\//)[0]
        .replace(/\/?#.+/, "");
    },
  },
  mounted() {
    this.$root.$on("close-version-selector", () => {
      this.toggleVersionSelector(true);
    });
  },
  methods: {
    closeSidebar() {
      this.$root.$emit("close-sidebar");
    },
    toggleSubMenuItems(el) {
      el.target.parentElement.classList.toggle("active");
    },
    getMenuItemLink(menuItemName, href) {
      if (menuItemName == "Latest News") {
        return href;
      }
      if (menuItemName == "Example Applications") {
        return href;
      }
      return `${this.base_url}/#${href}`;
    },
    toggleVersionSelector(forceClose = false) {
      if (forceClose) {
        this.version_selector_is_active = false;
        return;
      }
      this.version_selector_is_active = !this.version_selector_is_active;
    },
  }
}
</script>

<style lang="scss" scoped>

ul li {
  list-style-type: none;
}

ul li ul li {
  margin-left: 0;
}

ul li ul li a {
  padding-left: 3rem !important;
}

.sidebar {
  -webkit-overflow-scrolling: touch;
  display: block;
  height: 100%;
  overflow: auto;
  top: 0;
  left: 0;
  height: 100%;
  position: fixed;
  border-right: 1px solid #e8e8e8;
  box-shadow: 7px 0 12px -6px rgba(100,100,100,0.2);
  z-index: 10;
  a {
      color: #f4f4f4;
      &:hover {
          text-decoration: none;
      }
  }
}

.menu-name {
  color: #f4f4f4;
  background: #36304a;
  border-bottom: 1px solid #3f3955;
  font-weight: bold;
  letter-spacing: 0.10875rem;
  margin: 0;
  text-transform: uppercase;
}

.menu-name-link {
  display: block;
  padding: 0.725rem 1.45rem;
  &:hover {
    color: #f4f4f4;
  }
  &.is-link {
    cursor: pointer;
    &:hover {
      color: #333333;
      background-color: #f4f4f4;
    }
  }
}

.active .collapser {
  transform: rotate(45deg);
}

.menu-item {
  margin-left: 0;
  &:last-of-type {
    border-bottom: 1px solid #3f3955;
  }
}

.menu-item {
  background-color: #282633;
  transition-property: background-color;
  transition: .15s ease;
  &:hover {
    background-color: #f4f4f4;
  }
}

.menu-item-link,
.menu2-item-link {
  display: block;
  color: #f4f4f4;
  padding: 0 1.45rem;
  transition-property: color;
  transition: .15s ease;
  &:hover {
    color: #333333;
  }
}

span.menu-item-link:hover {
  cursor: pointer;
}
span.menu-item-link:hover > a {
  color: #333333;
}

.collapser {
  padding-right: 0.5rem;
  color: #019e01;
  display: inline-block;
  margin: 0;
  font-size: 1.2rem;
  transition: .2s transform ease;
  transform-origin: 6px; // Because this elem doesnt have equal padding, so
                         // using rotate makes it look al skewiff
}

.menu-item.active:hover a {
  color: #333333;
}

.menu-items-list {
  li {
    transition-property: opacity height;
    transition: .15s ease;
    opacity: 0;
    height: 0;
  }
}

.menu-item:hover .menu-items-shown {
  a, .menu-item-link a {
    color: #333333;
  }
}

.menu-item.active {
  a {
    color: #f4f4f4;
    &:hover {
      color: #ff7700;
    }
  }
  li {
    color: #333333;
    opacity: 1;
    height: 2.5rem;
  }
}

.version-selector {
  .current-version {
    color: #333333 !important;
    .fa-caret-down {
      top: .75rem;
      right: .75rem;
    }
  }
  .version-menu {
    opacity: 0;
    pointer-events: none;
    transition: .2s opacity ease;
    &.active {
      pointer-events: auto;
      opacity: 1;
    }
  }
  .version-link {
    color: #333333 !important;
    &:hover {
      background: #f4f4f4;
    }
  }
}
</style>

<template lang="pug">
div.sidebar.text-sm(:style="'background-color: ' + styles.background_color + ';'")
  a(:href="base_url + '/'")
    img(:alt="module" :src="logo" style="height: 150px").mx-auto.m-10
  div.version-selector.mx-5.mb-5.cursor-pointer.relative
    div.current-version.relative
      p#current_version_item.self-center.mb-0.block.px-5.rounded-lg(
        @click="toggleVersionSelector()"
        style="background-color: #f4f4f4"
      ) {{ current_version }}
        span.absolute.ml-2.fas.fa-caret-down
    div.version-menu.bg-white.rounded-lg.overflow-hidden.absolute.w-full.shadow-lg(
      :class="{'active': version_selector_is_active}"
    )
      a.version-link.block.px-5(
        v-for="(version) in versions"
        :href="'/' + module + '/' + version + '/'"
      ) {{ version }}
  div(style="border-top: 1px solid #3f3955;")
    div(v-for="(sub_menu_items, menu_item_name) in menus")
      div.menu-name
        a.menu-name-link {{ menu_item_name }}
      ul.mb-0
        li.menu-item(v-for="(href, link_text) in sub_menu_items")
          span.menu-item-link(v-if="typeof href == 'object'" @click="toggleSubMenuItems")
            span.collapser.pointer-events-none +
            a.pointer-events-none {{ link_text }}
          ul.menu-items-list.overflow-hidden.mb-0(v-if="typeof href == 'object'")
            li.menu2-item(v-for="(href, link_text) in sub_menu_items[link_text]")
              a.menu2-item-link(:href="base_url + '/#' + href" @click="closeSidebar()") {{ link_text }}
          a.menu-item-link(
            v-else-if="menu_item_name == 'Latest News'"
            :href="getMenuItemLink(menu_item_name, href)"
            @click="closeSidebar()"
            :target="menu_item_name == 'Latest News' && link_text != 'No articles yet' ? '_BLANK' : ''"
          ) {{ link_text }}
          a.menu-item-link(
            v-else
            :href="getMenuItemLink(menu_item_name, href)"
            @click="closeSidebar()"
          ) {{ link_text }}
    div.menu-name(v-if="api_reference_href")
      a.menu-name-link.is-link(:href="api_reference_href" @click="closeSidebar()") API Reference
    div.menu-name
      a.menu-name-link.is-link(:href="github_href" @click="closeSidebar()") GitHub
    div.menu-name
      a.menu-name-link.is-link(href="/") Back To Drash Land
  div(style="color: #f4f4f4").mt-5.text-sm.text-center
    p.mb-2 &copy; 2019-{{ $conf.copyright_year }} Drash Land
    p.mb-10 Built with Deno &amp; Drash
</template>
