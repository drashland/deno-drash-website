import { Drash } from "./deps.ts";
import { LandingResource } from "./src/resources/landing_resource.ts";
import { ModuleResource } from "./src/resources/module_resource.ts";
import { PlaygroundResource } from "./src/resources/playground_resource.ts";
import { Response } from "./src/response.ts";

Drash.Http.Response = Response;

export const server = new Drash.Http.Server({
  resources: [
    LandingResource,
    ModuleResource,
    PlaygroundResource
  ],
  response_output: "text/html",
  static_paths: {
    "/assets": "/assets",
  },
  directory: ".",
});
