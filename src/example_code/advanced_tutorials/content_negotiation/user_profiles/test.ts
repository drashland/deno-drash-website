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

  request = members.mockRequest("/users/1?response_content_type=text/html");
  actual = await server.handleHttpRequest(request);
  members.assert.equals(
    members.decoder.decode(actual.body),
    getHtmlCaptainAmerica()
  );
});

function getHtmlCaptainAmerica() {
  return `<!DOCTYPE html>
<html class="h-full w-full">
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, minimum-scale=1.0, user-scalable=no"/>
		<title>Hello World</title>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
	</head>
	<body class="h-full w-full">
		<div class="flex h-full w-full items-center justify-center">
			<div class="max-w-sm rounded overflow-hidden shadow-lg">
				<img class="w-full" src="https://images.bewakoof.com/original/avengers-logos-mini-backpack-avl-essential-printed-mini-backpacks-183193-1524728878.jpg" alt="Avengers">
				<div class="px-6">
					<div class="font-bold text-xl my-6">Captain America</div>
					<div class="mb-6">
						<div class="flex my-2">
							<div class="w-1/2">
								<p class="text-grey-darker text-base font-bold">Name</p>
							</div>
							<div class="w-1/2">
								<p class="text-grey-darker text-base">Steve Rogers</p>
							</div>
						</div>
						<div class="flex my-2">
							<div class="w-1/2">
								<p class="text-grey-darker text-base font-bold">API Key</p>
							</div>
							<div class="w-1/2">
								<p class="text-grey-darker text-base">**********</p>
							</div>
						</div>
						<div class="flex my-2">
							<div class="w-1/2">
								<p class="text-grey-darker text-base font-bold">API Secret</p>
							</div>
							<div class="w-1/2">
								<p class="text-grey-darker text-base">**********</p>
							</div>
						</div>
					</div>
					<hr class="border-b border-gray">
				</div>
				<div class="px-6 py-4">
					<span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#deno</span>
					<span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#drash</span>
					<span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#marvel</span>
				</div>
			</div>
		</div>
	</body>
</html>
`;
}

members.runTests();
