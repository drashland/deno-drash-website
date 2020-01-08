const members = (await import(Deno.env().DENO_DRASH_DOCS_MEMBERS)).default;

import response from "./part_5/response.ts";
members.Drash.Http.Response = response;

import UsersResource from "./part_5/users_resource.ts";

members.test("response", async () => {

  let server = new members.Drash.Http.Server({
    address: "localhost:1447",
    response_output: "application/json",
    resources: [UsersResource],
  });

  server.run();

  let res;

  res = await members.http("http://localhost:1447/users/1?response_content_type=application/json");

  members.assert.equals(
    JSON.parse(res),
    {
      id: 1,
      alias: "Captain America",
      name: "Steve Rogers",
      api_key: "**********",
    }
  );

  res = await members.http("http://localhost:1447/users/1?response_content_type=text/html");

  members.assert.equals(
    res,
    generateHtml({
      alias: "Captain America",
      name: "Steve Rogers"
    })
  );

  res = await members.http("http://localhost:1447/users/1?response_content_type=text/xml");

  members.assert.equals(
    res,
    generateXml({
      alias: "Captain America",
      name: "Steve Rogers"
    })
  );

  members.close(server);
});

function generateHtml(user) {
  try {
    let template = members.readFileContents("./user.html");
    template = template
      .replace(/\{\{ alias \}\}/, user.alias)
      .replace(/\{\{ name \}\}/, user.name);
    return template;
  } catch (error) {
  }
}

function generateXml(user) {
  try {
    let template = members.readFileContents("./user.xml");
    template = template
      .replace(/\{\{ alias \}\}/, user.alias)
      .replace(/\{\{ name \}\}/, user.name);
    return template;
  } catch (error) {
  }
}

members.runTests();
