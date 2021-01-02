<script>
export const resource = {
  paths: ["/issues"],
  meta: {
    title: "Issues",
    source_code_uri: "/issues",
  }
}

export default {
  data() {
    return {
      toc: {
        items: [
          "File An Issue",
          "Current Issues",
        ]
      },
      issues_drash: [],
      issues_drash_docs: []
    };
  },
  mounted() {
    this.fetchIssues();
  },
  methods: {
    async fetchIssues() {
      const client = new this.$api_service("https://api.github.com");
      const issuesDrash = await client.makeRequest("get", "/repos/drashland/deno-drash/issues");
      if (issuesDrash) {
        this.issues_drash = issuesDrash;
      }
      const issuesDrashDocs = await client.makeRequest("get", "/repos/drashland/deno-drash-docs/issues");
      if (issuesDrash) {
        this.issues_drash_docs = issuesDrashDocs;
      }
    },
  }
}
</script>

<template lang="pug">
page(
  :toc="toc"
)
  div.row
    div.col
      hr
      h2-hash File An Issue
      p File an issue regarding Drash (bugs, feature requests, testing, etc.) <a href="https://github.com/drashland/deno-drash/issues" target="_BLANK">here</a>.
      p File an issue regarding Drash Documentation (bugs, tutorials, etc.) <a href="https://github.com/drashland/deno-drash-docs/issues" target="_BLANK">here</a>.
      p Also, contributors are welcomed!
  div.row
    div.col
      hr
      h2-hash Current Issues
      div.row
        div.col-md
          h3 Drash ({{ issues_drash.length }})
          a.card-a(v-for="issue in issues_drash" :href="issue.html_url" target="_BLANK")
            div.alert(:class="issue.assignee ? 'alert-secondary' : 'alert-light'")
              h4(style="padding-right: 5rem;") {{ issue.title }}
              span.badge.badge-success(style="display: inline-block; font-size: 1rem; position: absolute; top: 1rem; right: 1rem;" v-if="issue.assignee") Assigned
        div.col-md
          h3 Drash Documentation ({{ issues_drash_docs.length }})
          a.card-a(v-for="issue in issues_drash_docs" :href="issue.html_url" target="_BLANK")
            div.alert(:class="issue.assignee ? 'alert-secondary' : 'alert-light'" style="position: relative;")
              h4(style="padding-right: 5rem;") {{ issue.title }}
              span.badge.badge-success(style="display: inline-block; font-size: 1rem; position: absolute; top: 1rem; right: 1rem;" v-if="issue.assignee") Assigned
</template>

<style lang="scss" scoped>
  .alert-light {
    color: #ff7700;
  }
  .alert {
    transition: background 0.1s, border 0.1s;
  }
  .card-a {
    display: block;
    text-decoration: none;
  }
  .card-a:hover .alert {
    border: 1px solid #ffc99a;
    background: #ffeee0;
  }
  .card-a p {
    color: #000000;
    text-decoration: none;
  }
</style>
