<script>
  import Prism from 'prismjs';

  // Styling  for the code blocks
  import "prismjs/themes/prism-tomorrow.css" // The css styling for our code blocks

  // Supported languages
  import "prismjs/components/prism-bash.min.js" // needed for highlighting commands for shell-session
  import "prismjs/components/prism-shell-session.min.js"
  import "prismjs/components/prism-typescript.min.js"
  import "prismjs/components/prism-docker.min.js"
  import "prismjs/components/prism-javascript.min.js"
  import "prismjs/components/prism-json.min.js"
  import "prismjs/components/prism-jsx.min.js"
  import "prismjs/components/prism-tsx.min.js"
  import "prismjs/components/prism-nginx.min.js"
  import "prismjs/components/prism-yaml.min.js"
  import "prismjs/components/prism-apacheconf.min.js"

  // General css
  import "prismjs/plugins/line-numbers/prism-line-numbers.css"

  // Support line highlights
  import "prismjs/plugins/line-highlight/prism-line-highlight.min.js"
  import "prismjs/plugins/line-highlight/prism-line-highlight.css"

  // Support clipboard
  import "prismjs/plugins/toolbar/prism-toolbar.css"
  import "prismjs/plugins/toolbar/prism-toolbar.min.js"
  import "/assets/common/js/prism-copy-to-clipboard.js"

export default {
  props: {
    header: {
      type: Boolean,
      default: true,
    },
    line_highlight: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      default: "text",
    },
    title: {
      type: String,
    },
    line_numbers: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.$root.$on("is-mobile", () => {
      this.is_mobile = true;
    });
    this.$root.$on("is-not-mobile", () => {
      this.is_mobile = false;
    });
  },
  data() {
    return {
      is_mobile: false,
    };
  },
  mounted() {
    Prism.highlightAll();
    // For safari, highlighted lines of code appear buggy - the 'highlight' is slightly above the line of code eg not aligned.
    // PrismJS seems to set a `top: xxpx` property on highlighted code. How you can do this is: inspect the whole code block elements and expand it, and scroll down to the bottom - whilst you may think the style would be applied in order, it isn't, and there are separate tags at the end of the main code block element that are used to style the highlighting.
    // It seems that adding 5% of the existing `top` property on those elements fixes it for safari
    window.addEventListener("DOMContentLoaded", () => {
      const ua = navigator.userAgent.toLowerCase()
      if (ua.includes("safari") === false || ua.includes("chrome") === true) {
        return
      }
      const highlightedElems = document.querySelectorAll(".line-highlight")
      for (const elem of highlightedElems) {
        const top = elem.style.top
        const [size] = top.split("px")
        const newSize = Number(size) * (1 + 0.05) // + 5%
        console.log(newSize)
        elem.style.top = newSize + "px"
      }
    })
  }
}
</script>

<style lang="scss" scoped>
[data-line] {
  padding: 1em;
}
.header {
  border-radius: 1rem 1rem 0 0;
  background-color: #454545;
  color: #ffffff;
}
code.header {
  border-radius: 0;
  line-height: 1rem;
}
.body {
  border-radius: 0 0 1rem 1rem;
  margin: 0;
}
.body.no-header {
  border-radius: 1rem;
}
.is-mobile {
  margin-left: -2rem;
  margin-right: -2rem;
}
</style>

<style lang="scss">
ul .code-block.is-mobile,
ol .code-block.is-mobile {
  margin-left: -4rem;
}
.line-highlight:after,
.line-highlight:before {
  display: none;
}
pre.header {
  white-space: normal;
  overflow-wrap: anywhere;
}
</style>

<template lang="pug">
div.code-block.mb-5(
  :class="{'is-mobile': is_mobile}"
)
  pre.header.mb-0.p-4(v-if="header !== false")
    code.header {{ title }}
  pre.body(
    :data-line="line_highlight"
    :class="{'no-header': header === false, 'line-numbers': line_numbers}"
    )
    code(:class="'language-' + language")
      slot
</template>
