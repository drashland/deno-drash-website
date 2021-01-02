<script>
import Description from "../description.vue";

const title = "About Drash";

export const resource = {
  paths: ["/about-drash"],
  meta: {
    title: title,
  }
}

export default {
  components: {
    Description
  },
  data() {
    return {
      title: title,
      toc: [
        "What Is Drash?",
        "Why Use Drash?",
        "Versioning",
        "About These Documentation Pages",
      ]
    };
  },
}
</script>

<template lang="pug">
page(
  :base_url="this.$conf.drash.base_url"
  :title="title"
  :toc="toc"
)
  h2-hash What Is Drash?
  description
  hr
  h2-hash Why Use Drash?
  p Drash takes concepts from the following:
  ul
    li <a href="https://flask.palletsprojects.com/en/1.1.x/" target="_BLANK">Flask</a> &mdash; being <a href="https://flask.palletsprojects.com/en/1.1.x/foreword/#what-does-micro-mean" target="_BLANK">micro</a> and extensible
    li <a href="https://laravel.com/" target="_BLANK">Laravel</a> &mdash; use of similarly styled <a href="https://laravel.com/docs/master/middleware">middleware</a>
    li <a href="https://www.peej.co.uk/tonic/" target="_BLANK">Tonic</a> &mdash; use of <a href="https://github.com/peej/tonic#how-it-works" target="_BLANK">resources</a>
    li <a href="https://www.restapitutorial.com/lessons/whatisrest.html" target="_BLANK">RESTful</a> principles &mdash; content negotiation, HTTP verbs, URIs, etc.
  p Thrown into the mix is Drash's own concepts such as:
  ul
    li Documentation-driven development
    li Test-driven development
    li Lowering barriers to usage
    li Zero dependencies
  p Want to know what makes Drash a unique framework? Read the article <a href="https://dev.to/drash_land/what-makes-drash-different-idd" target="_BLANK">here</a>.
  hr
  h2-hash Versioning
  P Drash's versioning system will always follow <a href="https://semver.org/" target="_BLANK">semver.org</a>.
  hr
  h2-hash About These Documentation Pages
  p We know the pain of using new software that is not extensively documented. Therefore, all released Drash code that is intended to be used is documented. Anything that will be released will be documented before being released. This is how we lower our barriers to usage, so you can continue coding confidently without questions.
  p Most of the pages on this site are written in a tutorial format. You are given an introduction to the page, example code, and an end state that you can work towards. These pages mostly assume you have no working knowledge of Drash and try to be explicit as possible in the instructions.
</template>
