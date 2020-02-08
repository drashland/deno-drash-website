<template lang="pug">
div.c-sidebar
  div(v-if="$conf.environment != 'production'")
      p.l-environment-text(style="position:fixed; right: 0")
          span.text ENVIRONMENT: {{ $conf.environment }}
  div.c-sidebar__header(style="padding: 2rem 0;")
    div.row.align-items-center.text-align--center
      div.col
        h1.module-name.margin-bottom--0
          a-base-url(href="/")
            img.margin-bottom--0(alt="Drash" :src="$conf.base_url + '/public/assets/img/logo_drash.png'" width="auto" height="80")
            span.text-hide Drash
    div.row
      div.col
        p.shields.text-align--center(style="margin-top: 1rem; margin-bottom: 0")
          a(href="https://github.com/drashland/deno-drash/releases" target="_BLANK")
            img.margin-bottom--0(alt="GitHub release" src="https://img.shields.io/github/release/drashland/deno-drash.svg?color=brightgreen&label=latest" width="auto" height="20")
          a(href="https://travis-ci.org/drashland/deno-drash" target="_BLANK")
            img.margin-bottom--0(alt="Travis CI Build Master" src="https://img.shields.io/travis/drashland/deno-drash/master?label=master" width="auto" height="20")
          a(href="https://gitter.im/drashspace/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge" target="_BLANK")
            img.margin-bottom--0(src="https://badges.gitter.im/drashspace/community.svg")
  </a>
  div.c-sidebar__body
    div.c-sidebar__menu
      a-base-url.heading-link(href="/introduction#top") Introduction
      div.c-sidebar__menu-body
        a-base-url(href="/introduction#drash-in-a-nutshell") Drash In A Nutshell
        a-base-url(href="/introduction#quickstart") Quickstart
        a-base-url(href="/introduction#importing") Importing
        a-base-url(href="/introduction#features") Features
        a-base-url(href="/about-drash") About Drash
        a-base-url(href="/api-reference") API Reference
        a-base-url(href="/dependency-management") Dependency Management
        a-base-url(href="/issues") Issues
        a(href="https://github.com/drashland/deno-drash" target="_BLANK") View On GitHub &mdash; Drash
        a(href="https://github.com/drashland/deno-drash-docs" target="_BLANK") View On GitHub &mdash; Drash Docs
      a-base-url.heading-link(href="/tutorials") Tutorials
      div.c-sidebar__menu-body
        a-base-url(href="/tutorials/introduction") Introduction
        a Resources
        div.l-submenu-1
          a-base-url(href="/tutorials/resources/creating-a-resource") Creating A Resource
        a Requests
        div.l-submenu-1
          a Handling Bodies
          div.l-submenu-2
            a-base-url(href="/tutorials/requests/handling-application-json-bodies") application/json
            a-base-url(href="/tutorials/requests/handling-application-x-www-form-urlencoded-bodies") application/x-www-form-urlencoded
            a-base-url(href="/tutorials/requests/handling-multipart-form-data-bodies") multipart/form-data
          a-base-url(href="/tutorials/requests/handling-path-params") Handling Path Params
          a-base-url(href="/tutorials/requests/handling-url-query-params") Handling URL Query Params
        a Servers
        div.l-submenu-1
          a-base-url(href="/tutorials/servers/creating-a-server") Creating A Server
          a-base-url(href="/tutorials/servers/serving-static-paths") Serving Static Paths
        a Middleware
        div.l-submenu-1
          a-base-url(href="/tutorials/middleware/introduction") Introduction
          a-base-url(href="/tutorials/middleware/adding-server-level-middleware") Adding Server-Level Middleware
          a-base-url(href="/tutorials/middleware/adding-resource-level-middleware") Adding Resource-Level Middleware
          a-base-url(href="/tutorials/middleware/morgan-style-logging-middleware") Morgan-Style Logging Middleware
        a Logging
        div.l-submenu-1
          a-base-url(href="/tutorials/logging/logging-to-the-terminal") Logging To The Terminal
          a-base-url(href="/tutorials/logging/logging-to-files") Logging To Files
          router-link(href="/tutorials/logging/logging-using-log-from-deno-std") Logging Using Log From deno_std
        a Testing
        div.l-submenu-1
          a-base-url(href="/tutorials/testing/unit-testing") Unit Testing
        a Misc
        div.l-submenu-1
          a-base-url(href="/tutorials/misc/adding-global-members") Adding Global Members
          //- a-base-url(href="/tutorials/misc/adding-third-party-modules") Adding Third-Party Modules
      a-base-url.heading-link(href="/advanced-tutorials") Advanced Tutorials
      div.c-sidebar__menu-body
        a-base-url(href="/advanced-tutorials/introduction") Introduction
        a-base-url(href="/advanced-tutorials/content-negotiation/user-profiles") Content Negotiation
        div.l-submenu-1
          a-base-url(href="/advanced-tutorials/content-negotiation/user-profiles/introduction") Introduction
          a-base-url(href="/advanced-tutorials/content-negotiation/user-profiles/part-1") Part 1: Simulate Database Records
          a-base-url(href="/advanced-tutorials/content-negotiation/user-profiles/part-2") Part 2: Creating The Server
          a-base-url(href="/advanced-tutorials/content-negotiation/user-profiles/part-3") Part 3: Creating The Resource
          a-base-url(href="/advanced-tutorials/content-negotiation/user-profiles/part-4") Part 4: Handling Representations
          a-base-url(href="/advanced-tutorials/content-negotiation/user-profiles/part-5") Part 5: Adding More Content Types
        a-base-url(href="/advanced-tutorials/creating-an-api/coffee-and-tea") Creating An API
        div.l-submenu-1
          a-base-url(href="/advanced-tutorials/creating-an-api/coffee-and-tea/introduction") Introduction
          a-base-url(href="/advanced-tutorials/creating-an-api/coffee-and-tea/part-1") Part 1: Simulate Database Records
          a-base-url(href="/advanced-tutorials/creating-an-api/coffee-and-tea/part-2") Part 2: Creating The Server
          a-base-url(href="/advanced-tutorials/creating-an-api/coffee-and-tea/part-3") Part 3: Creating The Resources
          a-base-url(href="/advanced-tutorials/creating-an-api/coffee-and-tea/part-4") Part 4: Modifying The Response Schema
      a.heading-link Third Party Tutorials
      div.c-sidebar__menu-body
        a-base-url(href="/third-party-tutorials/introduction") Introduction
        a Databases
        div.l-submenu-1
          a-base-url(href="/third-party-tutorials/databases/deno-mysql") deno_mysql
          a-base-url(href="/third-party-tutorials/databases/deno-postgres") deno-postgres
        a Template Engines
        div.l-submenu-1
          a-base-url(href="/third-party-tutorials/template-engines/dejs") dejs
  div.c-sidebar__footer
    div.row
      div.col.text-align--center
        p.l-icons
          a(href="https://github.com/drashland/deno-drash", target="_BLANK")
            i.fab.fa-github
        hr
        p Drash Documentation was last updated on {{ $conf.build_date }}
</template>

<script>
export default {
    data() {
        return {};
    },
}
</script>
