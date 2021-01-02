<script>
const title = "Creating A HTTPS Server";

export const resource = {
  paths: ["/tutorials/servers/creating-an-https-server"],
  meta: {
    title: title,
    source_code_uri: "/tutorials/servers/creating_an_https_server"
  }
}

export default {
  data() {
    return {
      title: title,
      toc: [
        "Before You Get Started",
        "Server Syntax",
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
  h2-hash Before You Get Started
  p The only difference between running an HTTP server and an HTTPS server is the method you use to run the server.
  p HTTP servers use <code>server.run()</code> and HTTPS servers use <code>server.runTLS()</code> with two extra configs: <code>certFile</code> and <code>keyFile</code>.
  hr
  h2-hash Server Syntax
  code-block(title="/path/to/your/project/app.ts" language="typescript")
    | import { Drash } from "https://deno.land/x/drash@{{ $conf.drash.latest_version }}/mod.ts";
    | 
    | import HomeResource from "./home_resource.ts";
    | 
    | const server = new Drash.Http.Server({
    |   response_output: "application/json",
    |   resources: [HomeResource],
    | });
    | 
    | server.runTLS({
    |   hostname: "localhost",
    |   port: 1447,
    |   certFile: "/path/to/certFile.crt",
    |   keyFile: "/path/to/keyFile.key"
    | });


</template>
