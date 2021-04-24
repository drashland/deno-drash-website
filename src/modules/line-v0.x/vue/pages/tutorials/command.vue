<script>
export const resource = {
  paths: ["/tutorials/command"],
  meta: {
    title: "Command",
  }
}

export default {
  data() {
    return {
      title: resource.meta.title,
      toc: [
        "Before You Get Started",
        "Instantiating An Instance Of Line",
        "Example",
      ]
    };
  },
}
</script>

<template lang="pug">
page(
  :base_url="this.$conf.line.base_url"
  :title="title"
  :toc="toc"
)
  h2-hash Before You Get Started
  p In your file where you will create your CLI tool, <code>const fm = new Line({...})</code>, this is your command. You are registering quite a few properties that Line will use to create your CLI.
  p What you install is your command, for example <code>fm</code> (taken from the quickstart), this becomes your command. When yourself or someone else installs your CLI file (to install your CLI), Line will register the <code>--version, --help, -h</code> and </code>-v</code> options, alongside any subcommands you registered.
  hr
  h2-hash Instantiating An Instance Of Line
  p Creating an instance of Line is the bread and butter of your CLI tool. The class takes an object that will help define your CLI:
  ul
    li
      p <code>name</code> - What is the name of your CLI? This is where you define that. Say you wanted your CLI to be called "manager": <code>name: "manager"</code>. The name is what displays at the top of the <code>--help</code> output.
    li
      p <code>description</code> - This is the description of your CLI, how would you describe in a simple sentance? For example: <code>description: "Manage what ports are open</code>. The description is displayed underneath the name in the <code>--help</code> output.
    li
      p <code>command</code> - This is the name of your command. Take the quickstart for example, the value here would be "fm". This helps in Line displaying your command name alongside any information in the <code>--help</code> output.
    li
      p <code>subcommands</code> - This can hold a list of subcommands that can be used with your CLI. For more information on this, please refer to the subcommand tutorial.
    li
      p <code>version</code> - What version is your CLI tool? For example: <code>version: "v1.0.0"</code>.
  hr
  h2-hash Example
  Here is an example of how a command will look:
  code-block(title="app.ts" language="typescript")
    | const l = new Line({
    |   command: "fm",
    |   name: "File Manager",
    |   description: "File operations, such as reading and writing",
    |   subcommands: [
    |     Subcommand1,
    |     Subcommand2,
    |   ],
    |   version: "v1.0.0",
    | });
</template>
