<script>
import AppRoot from "/common/vue/app_root.vue";

export default {
  components: {
    AppRoot,
  },
  data() {
    return {
      articles: [],
      sidebar: {
        api_reference_href: "/drash/#/api-reference",
        base_url: this.$conf.drash.base_url,
        github_href: "https://github.com/drashland/deno-drash",
        logo: "/assets/common/img/logo_drash.svg",
        menus: {
          "Introduction": {
            "Drash In A Nutshell": "/#drash-in-a-nutshell",
            "Quickstart": "/#quickstart",
            "Importing": "/#importing",
            "Features": "/#features",
            "About Drash": "/about-drash",
            "Lifecycle Diagram": "/lifecycle-diagram",
          },
          "Latest News": {},
          "Tutorials": {
            "Introduction": "/tutorials",
            "Resources": {
              "Creating A Resource": "/tutorials/resources/creating-a-resource"
            },
            "Servers": {
              "Creating An HTTP Server": "/tutorials/servers/creating-an-http-server",
              "Creating An HTTPS Server": "/tutorials/servers/creating-an-https-server",
              "Serving Static Paths": "/tutorials/servers/serving-static-paths",
              "Serving Virtual Paths": "/tutorials/servers/serving-virtual-paths",
            },
            "Requests": {
              "Handling JSON Bodies": "/tutorials/requests/handling-json-bodies",
              "Handling URL Encoded Bodies": "/tutorials/requests/handling-url-encoded-bodies",
              "Handling Multipart Bodies": "/tutorials/requests/handling-multipart-bodies",
              "Handling URL Query Params": "/tutorials/requests/handling-url-query-params",
              "Handling Path Params": "/tutorials/requests/handling-path-params",
              "Get All Params": "/tutorials/requests/get-all-params"
            },
            "Responses": {
              //"Accept Header": "/tutorials/responses/accept-header",
              "Redirects": "/tutorials/responses/redirects",
            },
            "Middleware": {
              "Introduction": "/tutorials/middleware/introduction",
              "Adding Server-Level Middleware": "/tutorials/middleware/adding-server-level-middleware",
              "Adding Resource-Level Middleware": "/tutorials/middleware/adding-resource-level-middleware",
              "Using Drash Middleware Modules": "/tutorials/middleware/using-drash-middleware-modules",
            },
            "Cookies": {
              "Request Cookies": "/tutorials/cookies/request-cookies",
              "Response Cookies": "/tutorials/cookies/response-cookies",
            },
            "Front-End": {
              "Using Jae": "/tutorials/front-end/using-jae",
            },
            "CLI": {
              "Introduction": "/tutorials/cli/introduction",
              "Create App": "/tutorials/cli/create-app"
            },
            "Testing": {
              "Unit Testing": "/tutorials/testing/unit-testing",
            },
            "Error Handling": {
              //"Customizing Error Handling": "/tutorials/error-handling/customizing-error-handling",
              "Angular Deep Linking": "/tutorials/error-handling/angular-deep-linking",
            },
            "Misc": {
              "Adding Global Members": "/tutorials/misc/adding-global-members",
              "Content Negotiation": "/tutorials/misc/content-negotiation",
              "Enabling Pretty Links": "/tutorials/misc/pretty-links",
            }
          },
          "Advanced Tutorials": {
            "Introduction": "/advanced-tutorials/introduction",
            "Creating An API": "/advanced-tutorials/creating-an-api",
            "Creating A Server Side Rendered App": "/advanced-tutorials/creating-a-server-side-rendered-app",
            "Creating A Client Side Rendered App (Vue)": "/advanced-tutorials/creating-a-client-side-rendered-app-vue",
            "Creating A Client Side Rendered App (React)": "/advanced-tutorials/creating-a-client-side-rendered-app-react",
            "Content Negotiation": "/advanced-tutorials/content-negotiation",
            "Using Drash With Docker Compose": "/advanced-tutorials/using-drash-with-docker-compose",
          },
          "Example Applications": {
            "Realworld Example": "https://github.com/drashland/deno-drash-realworld-example-app",
          },
        },
        module: "drash",
      }
    };
  },
}
</script>

<template lang="pug">
app-root(
  :sidebar="sidebar"
  news_tags="deno, drash"
  module="Drash"
)
</template>
