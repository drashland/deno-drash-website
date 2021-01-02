<script>
const title = "Creating A Client Side Rendered App (React)";
const subtitle = "Part 5: Creating The React Components";
const baseUri = "/advanced-tutorials/creating-a-client-side-rendered-app-react";

export const resource = {
    paths: ["/advanced-tutorials/creating-a-client-side-rendered-app-react/part-5"],
    meta: {
      title,
      subtitle,
    }
}

export default {
  data() {
    return {
      base_url: this.$conf.drash.base_url,
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
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="5" :parts="5")
  hr
  h2-hash Before You Get Started
  p Now that you have everything set up, you can start writing your React components in TSX.
  hr
  folder-structure-end-state
    code-block(:header="false" language="text" :line_numbers="false")
      | ▾ /path/to/your/project/
      |     app.ts
      |     ▾ components/
      |         App.tsx
      |         DenoTweets.tsx
      |     home_resource.ts
      |     index.html
      |     tsconfig.json
      |     webpack.config.js
  hr
  h2-hash Steps
  ol
    li
      p Create your React component for the Deno Tweets.
      p
        code-block(title="/path/to/your/project/components/DenoTweets.tsx" language="tsx")
          | import * as React from 'react'
          |
          | interface Props {
          |     title: string,
          |     description: string
          | }
          |
          | const DenoTweets = (props: Props) => {
          |     const { title, description } = props;
          |     return (
          |         <div>
          |             <h1 className="text-5xl">{ title }</h1>
          |             <p className="text-xl mb-5">{ description }</p>
          |             <hr className="mb-5"/>
          |             <a className="twitter-timeline" href="https://twitter.com/deno_land?ref_src=twsrc%5Etfw">
          |                 Tweets by deno_land
          |             </a>
          |         </div>
          |     )
          | }
          |
          | export default DenoTweets
      p Here, you are creating a component to control the display of the Deno tweets.
    li
      p Create your React App file to handle the display of your components.
      p
        code-block(title="/path/to/your/project/components/App.tsx" language="tsx")
          | import DenoTweets from './DenoTweets'
          | import ReactDOM from 'react-dom'
          | import * as React from 'react'
          |
          | ReactDOM.render(
          |     <DenoTweets title={"Deno"} description={"A secure runtime for JavaScript and TypeScript"} />,
          |     document.getElementById('root')
          | );
      p This is the entry point React file. This file will import all of your React components and render them.
  hr
  h2-hash Verification
  ol
    li
      p Build your environment.
      p
        code-block(title="Terminal" language="shell-session")
          | $ node_modules/.bin/webpack-cli --config webpack.config.js
      p Now that you have created your components, Webpack will transpile them so the browser can understand the contents.
    li
      p Start your server.
      p
        code-block(title="Terminal" language="shell-session")
          | $ deno run --allow-net --allow-read app.ts
      p Go to <code>localhost:1447/</code> in your browser.
      p You should the something similar to the following:
      p
        img(:src="'/assets/drash/img/example_code/advanced_tutorials/creating_a_react_app/deno_tweets/1.png'")
  div-alert-finished-tutorial-series
  hr
  breadcrumbs(:base_url="base_url + '/#' + base_uri" :part="5" :parts="5")
</template>
