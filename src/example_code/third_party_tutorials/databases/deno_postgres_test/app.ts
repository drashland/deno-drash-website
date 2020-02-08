import Drash from "https://deno.land/x/drash/mod.ts";
import members from "../../../../../tests/members.ts";

// Set up the server

import HomeResource from "./home_resource.ts";

const server = new Drash.Http.Server({
  address: "localhost:1447",
  response_output: "application/json",
  resources: [HomeResource]
});

// Set up the database

import { Client } from "https://deno.land/x/postgres/mod.ts";

const denoPostgres = new Client({
  database: "deno_postgres",
  host: "localhost",
  port: "5432",
  user: "crookse", // specify your db user
});

export {
  denoPostgres
}

members.test("deno-postgres", async () => {
  server.run({address: "localhost:3001"});
  const response = await members.fetch.get("http://localhost:3001");
  members.assert.responseJsonEquals(await response.text(), [["eric","m"]]);
  server.deno_server.close();
});
