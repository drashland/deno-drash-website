const members = (await import(Deno.env().DENO_DRASH_DOCS_MEMBERS)).default;

import response from "./part_5/response.ts";
members.Drash.Http.Response = response;

import UsersResource from "./part_5/users_resource.ts";

const http = async (request): Promise<any> => {
  return new Promise(resolve => {
    fetch(request)
      .then((response) => {
        return response.text()
      })
      .then((body) => {
        resolve(body);
      });
  });
};

members.test("response", async () => {

  let server = new members.Drash.Http.Server({
    address: "localhost:1447",
    response_output: "application/json",
    resources: [UsersResource],
  });

  server.run();

  let res;

  res = await http("http://localhost:1447/users/1?response_content_type=application/json");

  members.assert.equals(
    JSON.parse(res),
    {
      id: 1,
      alias: "Captain America",
      name: "Steve Rogers",
      api_key: "**********",
      api_secret: "**********"
    }
  );

  res = await http("http://localhost:1447/users/1?response_content_type=text/html");

  members.assert.equals(
    res,
    getHtmlCaptainAmerica()
  );

  server.deno_server.close();
});






// members.test("responses", async () => {
//   let request;
//   let actual;

//   request = members.mockRequest("/users/1?response_content_type=application/json");
//   actual = await server.handleHttpRequest(request);
//   members.assert.responseJsonEquals(
//     actual.body,
//     {
//       id: 1,
//       alias: "Captain America",
//       name: "Steve Rogers",
//       api_key: "**********",
//       api_secret: "**********"
//     }
//   );

//   request = members.mockRequest("/users/1?response_content_type=text/html");
//   actual = await server.handleHttpRequest(request);
//   members.assert.equals(
//     members.decoder.decode(actual.body),
//     getHtmlCaptainAmerica()
//   );
// });

function getHtmlCaptainAmerica() {
  return generateHtml({
    alias: "Captain America",
    name: "Steve Rogers"
  });
}

function generateHtml(user) {
  try {
    let html = readFileContents("./user.html");
    html = html
      .replace(/\{\{ alias \}\}/, user.alias)
      .replace(/\{\{ name \}\}/, user.name);
    return html;
  } catch (error) {
  }
}

function readFileContents(file: string) {
  let fileContentsRaw = Deno.readFileSync(file);
  const decoder = new TextDecoder();
  let decoded = decoder.decode(fileContentsRaw);
  return decoded;
}

members.runTests();
