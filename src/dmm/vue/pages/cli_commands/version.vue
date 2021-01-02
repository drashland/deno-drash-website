<script>
  import H2Hash from "/common/vue/h2_hash.vue";
  import Page from "/common/vue/page.vue";
  import CodeBlock from "/common/vue/code_block.vue";

  const title = "version";

  export const resource = {
    paths: [
      "/cli-commands/version",
    ],
    meta: {
      title: title
    }
  }

  export default {
    components: {
      CodeBlock,
      H2Hash,
      Page,
    },
    data() {
      return {
        base_url: this.$conf.dmm.base_url,
        title: title,
        toc: [
          "Description",
          "Example Usage",
        ],
      };
    }
  }
</script>

<template lang="pug">
page(
  :base_url="base_url"
  :title="title"
  :toc="toc"
)
  h2-hash Description
  p The <code>version</code> command will display the current version of dmm.
  hr
  h2-hash Example Usage
  code-block(title="Terminal" language="shell-session")
    | $ dmm version
    | dmm {{ $conf.dmm.latest_version }}
</template>

