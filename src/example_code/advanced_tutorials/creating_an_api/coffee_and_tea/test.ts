const members = (await import(Deno.env().DENO_DRASH_DOCS_MEMBERS)).default;

import response from "./part_4/response.ts";
members.Drash.Http.Response = response;

import CoffeeResource from "./part_4/coffee_resource.ts";
import TeaResource from "./part_4/tea_resource.ts";

members.test("responses", async () => {

  let server = new members.Drash.Http.Server({
    address: "localhost:1447",
    resources: [
      CoffeeResource,
      TeaResource
    ]
  });

  server.run();

  let res;

  res = await members.http("http://localhost:1447/coffee/17");

  members.assert.equals(
    JSON.parse(res),
    {
      status_code: 200,
      status_message: "OK",
      data: {
        id: 17,
        name: "Light Roast: Breakfast Blend",
        price: 2.25
      },
      request: {
        method: "GET",
        uri: "/coffee/17"
      }
    }
  );

  res = await members.http("http://localhost:1447/coffee/15");

  members.assert.equals(
    JSON.parse(res),
    {
      status_code: 404,
      status_message: "Not Found",
      data: "Coffee with ID \"15\" not found.",
      request: {
        method: "GET",
        uri: "/coffee/15"
      }
    }
  );

  members.close(server);
});

members.runTests();
