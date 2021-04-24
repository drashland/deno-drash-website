<script>
const title = "Creating An Advanced CLI";
const subtitle = "Introduction";
const baseUri = "/advanced-tutorials/creating-an-advanced-cli";

export const resource = {
  paths: [
    "/advanced-tutorials/creating-an-advanced-cli",
    "/advanced-tutorials/creating-an-advanced-cli/introduction",
  ],
  meta: {
    title,
    subtitle,
  }
}

export default {
  data() {
    return {
      base_url: this.$conf.line.base_url,
      base_uri: baseUri,
      title,
      subtitle,
    };
  }
}
</script>

<template lang="pug">
page(
  :base_url="base_url"
  :base_uri="base_uri"
  :title="title"
  :subtitle="subtitle"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="4")
  hr
  h2-hash Overview
  p In this tutorial series, you will learn how to create a command-line interface using Line. You will learn how to create your main command, subcommands and options. Alongside this, you will understand how your CLI tool will have version and help commands.
  p The CLI you will be creating will be a file manager. It will be able to read a given file, write content to a given file, and finally, the write command will support options. Both the command and subcommands will also have help options to support end users.
  p.mt-10.text-center
    a-get-started(:href="base_url + '/#' + base_uri + '/part-1'")
  hr
  h2-hash End State
  p Below are samples of what you will create.
  p
    img(:src="'/assets/line-v0.x/img/example_code/advanced_tutorials/creating_an_advanced_cli/TODO/part_5/verification_2.png'")
  p
    img(:src="'/assets/drash-v0.x/img/example_code/advanced_tutorials/content_negotiation/TODO/part_4/verification_3_json.png'")
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="-1" :parts="4")
</template>
