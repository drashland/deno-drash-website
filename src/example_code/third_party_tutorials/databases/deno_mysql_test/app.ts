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

import { Client } from "https://deno.land/x/mysql/mod.ts";

const denoMysql = await new Client().connect({
  hostname: "127.0.0.1",
  username: "root", // specify your username
  db: "deno_mysql",
  // password: "password", // uncomment and specify your password if using a password
});

export {
  denoMysql
}

members.test("deno_mysql", async () => {
  server.run({address: "localhost:3002"});
  const response = await members.fetch.get("http://localhost:1447");
  members.assert.responseJsonEquals(await response.text(), [
    {
      "name": "manyuanrong",
      "role": "author"
    }
  ]);
  server.deno_server.close();
});
