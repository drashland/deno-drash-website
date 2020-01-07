const members = (await import(Deno.env().DENO_DRASH_DOCS_MEMBERS)).default;

import response from "./part_5/response.ts";
members.Drash.Http.Response = response;

import UsersResource from "./part_5/users_resource.ts";

let server = new members.Drash.Http.Server({
  resources: [UsersResource]
});

members.test("responses", async () => {
  let request;
  let actual;

  request = members.mockRequest("/users/1?response_content_type=application/json");
  actual = await server.handleHttpRequest(request);
  members.assert.responseJsonEquals(
    actual.body,
    {
      id: 1,
      alias: "Captain America",
      name: "Steve Rogers",
      api_key: "**********",
      api_secret: "**********"
    }
  );
});

members.runTests();
