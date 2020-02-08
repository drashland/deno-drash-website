import Drash from "https://deno.land/x/drash/mod.ts";
import members from "../../../../../tests/members.ts";

import HomeResource from "./home_resource.ts";

const server = new Drash.Http.Server({
  address: "localhost:1447",
  response_output: "text/html",
  resources: [HomeResource]
});

let expected = `<!DOCTYPE html>
<html class="h-full w-full">
	<head>
		<meta charset="utf-8"/>
		<title>Drash + dejs</title>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
	</head>
	<body class="h-full w-full">
		<div class="flex h-full w-full items-center justify-center">
			<div class="max-w-sm rounded overflow-hidden shadow-lg">
				<img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
				<div class="px-6">
				<div class="font-bold text-xl mt-4 mb-2">Drash + dejs</div>
					<div class="mb-4">
						<p class="text-grey-darker text-base">Hello, (name not specified)! Drash + dejs is cool!</p>
					</div>
					<hr class="border-b border-gray">
				</div>
				<div class="px-6 py-4">
					<span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#deno</span>
					<span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#drash</span>
					<span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#dejs</span>
				</div>
				</div>
			</div>
		</div>
	</body>
</html>
`;

members.test("dejs", async () => {
  server.run({address:"localhost:3003"});
  const response = await members.fetch.get("http://localhost:3003");
  members.assert.equals(await response.text(), expected);
  server.deno_server.close();
});
