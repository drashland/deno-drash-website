<script>
const title = "Creating An API";
const subtitle = "Part 1: Simulate Database Records";

export const resource = {
    paths: ["/advanced-tutorials/creating-an-api/part-1"],
    meta: {
      title: title,
      subtitle: subtitle,
    }
}

export default {
  data() {
    return {
      base_url: this.$conf.drash.base_url,
      base_uri: "/advanced-tutorials/creating-an-api",
      title: title,
      subtitle: subtitle,
      toc: [
        "Before You Get Started",
        "Folder Structure End State",
        "Steps",
        "Verification",
      ],
    };
  },
}
</script>

<template lang="pug">
page(
  :toc="toc"
  :base_url="base_url"
  :base_uri="base_uri"
  :subtitle="subtitle"
  :title="title"
)
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="1" :parts="4")
  hr
  h2-hash Before You Get Started
  p Before you start building your application, you need the data that will drive this tutorial. For simplicity, you will simulate retrieving records from a database. You will pretend that you have queried a database for coffee and tea records. This data will be parsable as JSON.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     app.ts
  hr
  h2-hash Steps
  ol
    li
      p Create the <code>coffee.json</code> file.
      p
        code-block(title="coffee.json" language="json")
          | {
          |   "17": {
          |     "id": 17,
          |     "name": "Light Roast: Breakfast Blend",
          |     "price": 2.25
          |   },
          |   "28": {
          |     "id": 28,
          |     "name": "Medium Roast: Classico",
          |     "price": 2.50
          |   },
          |   "32": {
          |     "id": 32,
          |     "name": "Medium Roast: Premium Single Origin (Sumatra)",
          |     "price": 3.50
          |   }
          | }
    li
      p Create the <code>tea.json</code> file.
      p
        code-block(title="tea.json" language="json")
          | {
          |   "50": {
          |     "id": 50,
          |     "name": "Earl Gray",
          |     "price": 4.00
          |   },
          |   "68": {
          |     "id": 68,
          |     "name": "Citrus Chamomile",
          |     "price": 3.50
          |   },
          |   "83": {
          |     "id": 83,
          |     "name": "Imperial Blend",
          |     "price": 4.50
          |   }
          | }
  hr
  h2-hash Verification
  p This step is optional.
  p Since you just made JSON files and will be parsing these files as JSON in a later part, you should test that deno can parse it as JSON.
  ol
    li Open up the deno REPL by typing in <code>deno</code> in your terminal.
      code-block(title="Terminal" language="shell-session")
        | $ deno
        | >
    li Parse your files.
      code-block(title="Terminal" language="shell-session")
        | > let coffee = Deno.readFileSync("./coffee.json");
        | undefined
        |
        | > let tea = Deno.readFileSync("./tea.json");
        | undefined
        |
        | > const decoder = new TextDecoder();
        | undefined
        |
        | > JSON.parse(decoder.decode(coffee));
        | { 17: { id: 17, name: "Light Roast: Breakfast Blend", price: 2.25 }, 28: { id: 28, name: "Medium Roast: Classico", price: 2.5 }, 32: { id: 32, name: "Medium Roast: Premium Single Origin (Sumatra)", price: 3.5 } }
        |
        | > JSON.parse(decoder.decode(tea));
        | { 50: { id: 50, name: "Earl Gray", price: 4 }, 68: { id: 68, name: "Citrus Chamomile", price: 3.5 }, 83: { id: 83, name: "Imperial Blend", price: 4.5 } }
        |
        | >
  div-alert-next-tutorial-part
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="1" :parts="4")
</template>
