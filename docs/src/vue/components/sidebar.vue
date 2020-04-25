<template lang="pug">
div.c-sidebar
  div(v-if="$conf.environment != 'production'")
      p.l-environment-text(style="position:fixed; right: 0")
          span.text ENVIRONMENT: {{ $conf.environment }}
  div.c-sidebar__header(style="padding: 2rem 0;")
    div.row.align-items-center.text-align--center
      div.col
        h1.module-name.margin-bottom--0
          a(href="/")
            img.margin-bottom--0(alt="Drash" :src="'/public/assets/img/drash.svg'" width="auto" height="130")
            span.text-hide Drash
  div.c-sidebar__body
    div.c-sidebar__menu
      span.heading
        p.arrow.down
        span.heading-link Introduction
      div.c-sidebar__menu-body
        a-base-url(href="/introduction#drash-in-a-nutshell") Drash In A Nutshell
        a-base-url(href="/introduction#quickstart") Quickstart
        a-base-url(href="/introduction#importing") Importing
        a-base-url(href="/introduction#features") Features
        a-base-url(href="/about-drash") About Drash
        a-base-url(href="/examples") Examples
        a-base-url(href="/lifecycle-diagram") Drash Lifecycle Diagram
        a-base-url(href="/dependency-management") Dependency Management
        a-base-url(href="/issues") Issues
        a(href="https://github.com/drashland/deno-drash" target="_BLANK") View On GitHub &mdash; Drash
        a(href="https://github.com/drashland/deno-drash-docs" target="_BLANK") View On GitHub &mdash; Drash Docs
      span.heading
        p.arrow.right
        span.heading-link Tutorials
      div.c-sidebar__menu-body.hide--soft
        a-base-url(href="/tutorials/introduction") Introduction
        span.sub-heading
          p.arrow.right
          a Resources
        div.l-submenu-1.hide--soft
          a-base-url(href="/tutorials/resources/creating-a-resource") Creating A Resource
        span.sub-heading
          p.arrow.right
          a Requests
        div.l-submenu-1.hide--soft
          a-base-url(href="/tutorials/requests/handling-url-query-params") Handling URL Query Params
          a-base-url(href="/tutorials/requests/handling-application-json-bodies") Handling JSON Bodies
          a-base-url(href="/tutorials/requests/handling-application-x-www-form-urlencoded-bodies") Handling URL Encoded Bodies
          a-base-url(href="/tutorials/requests/handling-multipart-form-data-bodies") Handling Multipart Bodies
          a-base-url(href="/tutorials/requests/handling-path-params") Handling Path Params
        span.sub-heading
          p.arrow.right
          a Servers
        div.l-submenu-1.hide--soft
          a-base-url(href="/tutorials/servers/creating-a-server") Creating A Server
          a-base-url(href="/tutorials/servers/serving-static-paths") Serving Static Paths
          a-base-url(href="/tutorials/servers/creating-an-https-server") Creating An HTTPS Server
        span.sub-heading
          p.arrow.right
          a Middleware
        div.l-submenu-1.hide--soft
          a-base-url(href="/tutorials/middleware/introduction") Introduction
          a-base-url(href="/tutorials/middleware/adding-server-level-middleware") Adding Server-Level Middleware
          a-base-url(href="/tutorials/middleware/adding-resource-level-middleware") Adding Resource-Level Middleware
          a-base-url(href="/tutorials/middleware/morgan-style-logging-middleware") Morgan-Style Logging Middleware
        span.sub-heading
          p.arrow.right
          a Cookies
        div.l-submenu-1.hide--soft
          a-base-url(href="/tutorials/cookies/request-cookies") Request Cookies
          a-base-url(href="/tutorials/cookies/response-cookies") Response Cookies
        span.sub-heading
          p.arrow.right
          a Logging
        div.l-submenu-1.hide--soft
          a-base-url(href="/tutorials/logging/logging-to-the-terminal") Logging To The Terminal
          a-base-url(href="/tutorials/logging/logging-to-files") Logging To Files
          a-base-url(href="/tutorials/logging/logging-using-log-from-deno-std") Logging Using Log From deno_std
        span.sub-heading
          p.arrow.right
          a Front-end
        div.l-submenu-1.hide--soft
          a-base-url(href="/tutorials/front-end/introduction") Introduction
          a-base-url(href="/tutorials/front-end/creating-a-template") Creating A Template
          a-base-url(href="/tutorials/front-end/extending-a-template") Extending A Template
          a-base-url(href="/tutorials/front-end/adding-template-partials") Adding Template Partials
          a-base-url(href="/tutorials/front-end/in-template-javascript") In-Template JavaScript
        span.sub-heading
          p.arrow.right
          a Testing
        div.l-submenu-1.hide--soft
          a-base-url(href="/tutorials/testing/unit-testing") Unit Testing
        span.sub-heading
          p.arrow.right
          a Misc
        div.l-submenu-1.hide--soft
          a-base-url(href="/tutorials/misc/adding-global-members") Adding Global Members
          a-base-url(href="/tutorials/misc/content-negotiation") Content Negotiation
          a-base-url(href="/tutorials/misc/error-handling-angular-deep-linking") Error Handling: Angular Deep Linking
          a-base-url(href="/tutorials/misc/pretty-links") Pretty Links
          a-base-url(href="/tutorials/misc/redirects") Redirects
          //- a-base-url(href="/tutorials/misc/adding-third-party-modules") Adding Third-Party Modules
      span.heading
        p.arrow.right
        span.heading-link Advanced Tutorials
      div.c-sidebar__menu-body.hide--soft
        a-base-url(href="/advanced-tutorials/introduction") Introduction
        span.sub-heading
          p.arrow.right
          a-base-url(href="/advanced-tutorials/content-negotiation/user-profiles") Content Negotiation
        div.l-submenu-1.hide--soft
          a-base-url(href="/advanced-tutorials/content-negotiation/user-profiles/introduction") Introduction
          a-base-url(href="/advanced-tutorials/content-negotiation/user-profiles/part-1") Part 1: Simulate Database Records
          a-base-url(href="/advanced-tutorials/content-negotiation/user-profiles/part-2") Part 2: Creating The Server
          a-base-url(href="/advanced-tutorials/content-negotiation/user-profiles/part-3") Part 3: Creating The Resource
          a-base-url(href="/advanced-tutorials/content-negotiation/user-profiles/part-4") Part 4: Handling Representations
        span.sub-heading
          p.arrow.right
          a-base-url(href="/advanced-tutorials/creating-an-api/coffee-and-tea") Creating An API
        div.l-submenu-1.hide--soft
          a-base-url(href="/advanced-tutorials/creating-an-api/coffee-and-tea/introduction") Introduction
          a-base-url(href="/advanced-tutorials/creating-an-api/coffee-and-tea/part-1") Part 1: Simulate Database Records
          a-base-url(href="/advanced-tutorials/creating-an-api/coffee-and-tea/part-2") Part 2: Creating The Server
          a-base-url(href="/advanced-tutorials/creating-an-api/coffee-and-tea/part-3") Part 3: Creating The Resources
          a-base-url(href="/advanced-tutorials/creating-an-api/coffee-and-tea/part-4") Part 4: Modifying The Response Schema
        span.sub-heading
          p.arrow.right
          a-base-url(href="/advanced-tutorials/creating-a-static-html-app/about-me") Creating A Static HTML App
        div.l-submenu-1.hide--soft
          a-base-url(href="/advanced-tutorials/creating-a-static-html-app/about-me/introduction") Introduction
          a-base-url(href="/advanced-tutorials/creating-a-static-html-app/about-me/part-1") Part 1: Creating The Server
          a-base-url(href="/advanced-tutorials/creating-a-static-html-app/about-me/part-2") Part 2: Creating The Resources
          a-base-url(href="/advanced-tutorials/creating-a-static-html-app/about-me/part-3") Part 3: Creating The HTML Files
        span.sub-heading
          p.arrow.right
          a-base-url(href="/advanced-tutorials/creating-a-vue-app/deno-tweets") Creating A Vue App
        div.l-submenu-1.hide--soft
          a-base-url(href="/advanced-tutorials/creating-a-vue-app/deno-tweets/introduction") Introduction
          a-base-url(href="/advanced-tutorials/creating-a-vue-app/deno-tweets/part-1") Part 1: Creating The Server
          a-base-url(href="/advanced-tutorials/creating-a-vue-app/deno-tweets/part-2") Part 2: Creating The Resource
          a-base-url(href="/advanced-tutorials/creating-a-vue-app/deno-tweets/part-3") Part 3: Creating The Template
          a-base-url(href="/advanced-tutorials/creating-a-vue-app/deno-tweets/part-4") Part 4: Creating The Vue App
        span.sub-heading
          p.arrow.right
          a-base-url(href="/advanced-tutorials/creating-a-react-app/deno-tweets") Creating A React App
        div.l-submenu-1.hide--soft
          a-base-url(href="/advanced-tutorials/creating-a-react-app/deno-tweets/introduction") Introduction
          a-base-url(href="/advanced-tutorials/creating-a-react-app/deno-tweets/part-1") Part 1: Creating The Server
          a-base-url(href="/advanced-tutorials/creating-a-react-app/deno-tweets/part-2") Part 2: Creating The Resource
          a-base-url(href="/advanced-tutorials/creating-a-react-app/deno-tweets/part-3") Part 3: Creating The Template
          a-base-url(href="/advanced-tutorials/creating-a-react-app/deno-tweets/part-4") Part 4: Configuring Webpack and Typescript
          a-base-url(href="/advanced-tutorials/creating-a-react-app/deno-tweets/part-5") Part 5: Creating the React Components
        span.sub-heading
          p.arrow.right
          a-base-url(href="/advanced-tutorials/creating-a-docker-container/docker-compose-setup") Creating A Docker Container
        div.l-submenu-1.hide--soft
          a-base-url(href="/advanced-tutorials/creating-a-docker-container/docker-compose-setup/introduction") Introduction
          a-base-url(href="/advanced-tutorials/creating-a-docker-container/docker-compose-setup/part-1") Part 1: Creating The Source Code
          a-base-url(href="/advanced-tutorials/creating-a-docker-container/docker-compose-setup/part-2") Part 2: Creating The Services
          a-base-url(href="/advanced-tutorials/creating-a-docker-container/docker-compose-setup/part-3") Part 3: Creating The Dockerfiles
          a-base-url(href="/advanced-tutorials/creating-a-docker-container/docker-compose-setup/part-4") Part 4: Creating The Proxy Server
          a-base-url(href="/advanced-tutorials/creating-a-docker-container/docker-compose-setup/part-5") Part 5: Starting The Environment
          a-base-url(href="/advanced-tutorials/creating-a-docker-container/docker-compose-setup/part-6") Part 6: (Optional) Linking JavaScripts and Stylesheets
      span.heading
        p.arrow.right
        span.heading-link Third Party Tutorials
      div.c-sidebar__menu-body.hide--soft
        a-base-url(href="/third-party-tutorials/introduction") Introduction
        span.sub-heading
          p.arrow.right
          a Databases
        div.l-submenu-1.hide--soft
          a-base-url(href="/third-party-tutorials/databases/deno-mysql") deno_mysql
          a-base-url(href="/third-party-tutorials/databases/deno-postgres") deno-postgres
        span.sub-heading
          p.arrow.right
          a Template Engines
        div.l-submenu-1.hide--soft
          a-base-url(href="/third-party-tutorials/template-engines/dejs") dejs
      span.heading
        p.arrow.right
        span.heading-link Versions
      div.c-sidebar__menu-body.hide--soft
        a(href="/docs/v0.41.1/") v0.41.1
      span.heading
        p.arrow.right
        span.heading-link API Reference
      div.c-sidebar__menu-body.hide--soft
        span.sub-heading
          p.arrow.right
          a Exceptions
        div.l-submenu-1.hide--soft
          a-base-url(href="/api-reference/exceptions/http-exception") HttpException
          a-base-url(href="/api-reference/exceptions/http-middleware-exception") HttpMiddlewareException
        span.sub-heading
          p.arrow.right
          a Http
        div.l-submenu-1.hide--soft
          a-base-url(href="/api-reference/http/middleware") Middleware
          a-base-url(href="/api-reference/http/resource") Resource
          a-base-url(href="/api-reference/http/response") Response
          a-base-url(href="/api-reference/http/server") Server
        span.sub-heading
          p.arrow.right
          a Interfaces
        div.l-submenu-1.hide--soft
          a-base-url(href="/api-reference/interfaces/log-level-structure") LogLevelStructure
          a-base-url(href="/api-reference/interfaces/logger-configs") LoggerConfigs
          a-base-url(href="/api-reference/interfaces/parsed-request-body") ParsedRequestBody
          a-base-url(href="/api-reference/interfaces/server-configs") ServerConfigs
        span.sub-heading
          p.arrow.right
          a Loggers
        div.l-submenu-1.hide--soft
          a-base-url(href="/api-reference/loggers/logger") Logger
          a-base-url(href="/api-reference/loggers/console-logger") ConsoleLogger
          a-base-url(href="/api-reference/loggers/file-logger") FileLogger
        span.sub-heading
          p.arrow.right
          a Services
        div.l-submenu-1.hide--soft
          a-base-url(href="/api-reference/services/http-service") HttpService
          a-base-url(href="/api-reference/services/http-request-service") HttpRequestService
  div.c-sidebar__footer
    div.row
      div.col.text-align--center
        p(style="margin-top: 2rem; color: #ffffff; font-size: .9rem") Drash Documentation was last updated on {{ $conf.build_date }}
</template>

<script>
    $(document).ready(function () {
      /**
       * @param {jQuery} $headingBody jQuery selected element of the body container for the heading
       * @param {jQuery} $arrow jquery selected element of the arrow for the heading
       * @param {Event} event Click event object, to prevent link actions when collapsing
       */
      function handleExpandableClick ($headingBody, $arrow, event) {
        $headingBody.toggleClass('hide--soft')
        const isExpanded = $arrow.attr('class').indexOf('down') >= 0
        if (isExpanded) {
          $arrow.removeClass('down').addClass('right')
          event.preventDefault()
        } else {
          $arrow.removeClass('right').addClass('down')
        }
      }
      const $sidebarBody = $('.c-sidebar .c-sidebar__body')
      $($sidebarBody.find('.heading')).on('click', function (event) {
        const $headingBody = $(this).next()
        const $arrow = $(this).find('.arrow')
        handleExpandableClick($headingBody, $arrow, event)
      })
      $($sidebarBody.find('.sub-heading')).on('click', function (event) {
        const $subheadingBody = $(this).next()
        const $arrow = $(this).find('.arrow')
        handleExpandableClick($subheadingBody, $arrow, event)
      })
    })
export default {
    data() {
        return {};
    },
}
</script>
