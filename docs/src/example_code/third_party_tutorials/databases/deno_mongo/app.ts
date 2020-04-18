import { Drash } from "https://deno.land/x/drash/mod.ts";

// Set up the server

import HomeResource from "./home_resource.ts";

const server = new Drash.Http.Server({
  address: "localhost:1447",
  response_output: "application/json",
  resources: [HomeResource]
});

server.run();
