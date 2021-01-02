<script>
const title = "API Reference";
const baseUri = "/api-reference";

export const resource = {
  paths: [baseUri],
  meta: {
    title,
  }
}

export default {
  data() {
    return {
      base_url: this.$conf.drash.base_url,
      base_uri: baseUri,
      title,
    };
  },
  methods: {
    docDenoLandLink(path) {
      return "https://doc.deno.land/https/deno.land/x/drash@" + this.$conf.drash.latest_version + "/src" + path;
    },
  },
}
</script>

<template lang="pug">
page(
  :base_url="base_url"
  :base_uri="base_uri"
  :title="title"
)
  p The links below will redirect you to #[a(href="https://doc.deno.land" target="_BLANK") https://doc.deno.land].
  ul
    li
      p Drash
        ul
          li
            p Compilers
            ul
              li
                p
                  a(:href="docDenoLandLink('/compilers/template_engine.ts')" target="_BLANK") TemplateEngine
                  span  (Deprecated. Removal date: 01-01-2021. Find out more <a href="https://github.com/drashland/deno-drash/issues/430">here</a>.)
          li
            p CoreLoggers
            ul
              li
                p
                  a(:href="docDenoLandLink('/loggers/console_logger.ts')" target="_BLANK") ConsoleLogger
              li
                p
                  a(:href="docDenoLandLink('/loggers/file_logger.ts')" target="_BLANK") FileLogger
          li
            p Dictionaries
            ul
              li
                p
                  a(:href="docDenoLandLink('/dictionaries/log_levels.ts')" target="_BLANK") LogLevels
              li
                p
                  a(:href="docDenoLandLink('/dictionaries/mime_db.ts')" target="_BLANK") MimeDb
          li
            p Exceptions
            ul
              li
                p
                  a(:href="docDenoLandLink('/exceptions/http_exception.ts')" target="_BLANK") HttpException
              li
                p
                  a(:href="docDenoLandLink('/exceptions/http_middleware_exception.ts')" target="_BLANK") HttpMiddlewareException
              li
                p
                  a(:href="docDenoLandLink('/exceptions/http_response_exception.ts')" target="_BLANK") HttpResponseException
              li
                p
                  a(:href="docDenoLandLink('/exceptions/name_collision_exception.ts')" target="_BLANK") NameCollisionException
          li
            p Http
            ul
              li
                p
                  a(:href="docDenoLandLink('/http/middleware.ts')" target="_BLANK") Middleware
              li
                p
                  a(:href="docDenoLandLink('/http/request.ts')" target="_BLANK") Request
              li
                p
                  a(:href="docDenoLandLink('/http/resource.ts')" target="_BLANK") Resource
              li
                p
                  a(:href="docDenoLandLink('/http/response.ts')" target="_BLANK") Response
              li
                p
                  a(:href="docDenoLandLink('/http/server.ts')" target="_BLANK") Server
          li
            p Interfaces
            ul
              li
                p
                  a(:href="docDenoLandLink('/interfaces/log_level_structure.ts')" target="_BLANK") LogLevelStructure
              li
                p
                  a(:href="docDenoLandLink('/interfaces/logger_configs.ts')" target="_BLANK") LoggerConfigs
              li
                p
                  a(:href="docDenoLandLink('/interfaces/parsed_request_body.ts')" target="_BLANK") ParsedRequestBody
              li
                p
                  a(:href="docDenoLandLink('/interfaces/resource.ts')" target="_BLANK") Resource
              li
                p
                  a(:href="docDenoLandLink('/interfaces/resource_paths.ts')" target="_BLANK") ResourcePaths
              li
                p
                  a(:href="docDenoLandLink('/interfaces/response_output.ts')" target="_BLANK") ResponseOutput
              li
                p
                  a(:href="docDenoLandLink('/interfaces/server_configs.ts')" target="_BLANK") ServerConfigs
              li
                p
                  a(:href="docDenoLandLink('/interfaces/server_middleware.ts')" target="_BLANK") ServerMiddleware
          li
            p Services
            ul
              li
                p
                  a(:href="docDenoLandLink('/services/http_service.ts')" target="_BLANK") HttpService
              li
                p
                  a(:href="docDenoLandLink('/services/string_service.ts')" target="_BLANK") StringService
</template>

<style lang="scss" scoped>
li p a {
  color: #ff7700 !important;
  cursor: pointer !important;
  &:hover {
    text-decoration: underline !important;
  }
}
</style>
