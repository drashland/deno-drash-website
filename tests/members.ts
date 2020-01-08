import {
  Drash,
  ServerRequest,
  assertEquals,
  runTests,
  test
} from "../deps.ts";

const decoder = new TextDecoder();

function mockRequest(
  url = "/",
  method = "get",
  headers?: any,
  hydrate = true
): any {
  let request = new ServerRequest();
  request.url = url;
  request.method = method;
  request.headers = new Headers();
  if (hydrate) {
    request = Drash.Services.HttpService.hydrateHttpRequest(request, {
      headers: headers
    });
  }

  //
  // Stub `respond()` so we don't run into the following error:
  //
  //   TypeError: Cannot read property 'write' of undefined
  //   at BufWriter.flush (bufio.ts:446:25)
  //   at writeResponse (server.ts:97:16)
  //   at async Request.respond (server.ts:197:5)
  //
  request.respond = function respond(output: any) {
    return output;
  };

  return request;
};

function responseJsonEquals(actual: any, expected: any) {
  return assertEquals(JSON.parse(decoder.decode(actual)), expected);
}

function runTest(name, testFn) {
  Object.defineProperty(testFn, "name", { value: name });
  return test(testFn);
}

function readFileContents(file: string) {
  let fileContentsRaw = Deno.readFileSync(file);
  const decoder = new TextDecoder();
  let decoded = decoder.decode(fileContentsRaw);
  return decoded;
}

function close(server: Drash.Http.Server) {
  server.deno_server.close();
  fetch("http://localhost:1447");
}

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

export default {
  Drash,
  assert: {
    equals: assertEquals,
    responseJsonEquals: responseJsonEquals
  },
  close,
  decoder,
  http,
  mockRequest,
  readFileContents,
  runTests,
  test: runTest,
};

