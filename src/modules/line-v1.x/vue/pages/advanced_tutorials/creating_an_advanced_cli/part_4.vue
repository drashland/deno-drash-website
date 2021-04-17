<script>
const title = "Creating An Advanced CLI";
const subtitle = "Part 4: Using Your CLI";
const baseUri = "/advanced-tutorials/creating-an-advanced-cli";

export const resource = {
    paths: ["/advanced-tutorials/creating-an-advanced-cli/part-4"],
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
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
      ],
      title,
      subtitle,
    };
  },
}
</script>

<template lang="pug">
page(
  :base_url="base_url",
  :base_uri="base_uri",
  :subtitle="subtitle"
  :title="title"
  :toc="toc"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="4" :parts="4")
  hr
  h2-hash Before You Get Started
  p Now you have written all the logic for creating your own CLI tool, it's time to use it!
  p In this part, you are going to install the CLI, and read and write, to use the full functionality of the tool. Alongside this, you are going to get the help information and the version.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |   ▾ subcommands/
      |       read_command.ts
      |       write_command.ts
      |   ▾ options/
      |       overwrite_option.ts
      |     cli.ts
      |     file_to_read.txt
      |     file_with_text.txt
  hr
  h2-hash Steps
  ol
    li
      p Create your <code>file_to_read.txt</code> file.
      p
        code-block(title="/path/to/your/project/file_to_read.txt" language="text")
          | Hello world :)
      p This will be used with both the read and write subcommands.
    li
      p Create your <code>file_with_text.txt</code> file.
      p
        code-block(title="/path/to/your/project/file_with_text.txt" language="text")
          | Line is cool!
      p This will be used for the write subcommand.
  hr
  h2-hash Verification
  p Verify that you can install your CLI, and use every feature it offers.
  ol
    li
      p Install your CLI.
      p
        code-block(title="Terminal" language="shell-session")
          | $ deno install --allow-read --allow-write --name fm cli.ts
      p Note that if someone external wanted to install your CLI, it could be done like so:
      p
        code-block(title="Terminal" language="shell-session")
          | $ deno install --allow-read --allow-write --name fm https://deno.land/x/[your_module]@[version]/cli.ts
    li
      p Get help information
      p
        code-block(title="Terminal" language="shell-session")
          | $ fm
          | ...
          |
          | $ fm --help
          | ...
          |
          | $ fm -h
          | ...
    li
      p Get the version
      p
        code-block(title="Terminal" language="shell-session")
          | $ fm --version
          | File Manager v1.0.0
          |
          | $ fm -v
          | File Manager v1.0.0
    li
      p Read a file
      p
        code-block(title="Terminal" language="shell-session")
          | $ fm read file_to_read.txt
          | Hello world :)
    li
      p Write to a file
      p
        code-block(title="Terminal" language="shell-session")
          | $ fm write file_to_read.txt new_file.txt
    li
      p Try write to an existing file!
      p
        code-block(title="Terminal" language="shell-session")
          | $ fm write file_to_read.txt file_with_text.txt
          | file_with_text.txt already exists! Try use the --overwrite flag if you want to overwrite it.
    li
      p Use your option for the write command!
      p
        code-block(title="Terminal" language="shell-session")
          | $ fm write file_to_read.txt file_with_contents.txt --overwrite yes
    li
      p Get the help output for your subcommands.
      p
        code-block(title="Terminal" language="shell-session")
          | $ fm read
          | ...
          |
          | $ fm write
          | ...
  div-alert-finished-tutorial-series
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="4" :parts="4")
</template>
