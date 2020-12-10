import { BaseResource } from "./base_resource.ts";

const decoder = new TextDecoder();

export class LandingResource extends BaseResource {
  static paths = [
    "/",
  ]

  //////////////////////////////////////////////////////////////////////////////
  // FILE MARKER - METHODS - HTTP //////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  public async GET () {
    this.log("Requested landing page.");

    const filename = "./src/landing.html";

    if (!await this.fileExists(filename)) {
      return this.sendError(404);
    }

    try {
      let content = decoder.decode(Deno.readFileSync(filename));
      const environment = this.getEnvironment();
      const titleSuffix = environment != "production"
        ? ` [${environment}]`
        : "";
      content = content
          .replace("{{ environment }}", environment)
          .replace("{{ title }}", "Drash Land" + titleSuffix)
          .replace("{{ drash_api_configs }}", this.getServerConfigs());

      this.response.body = content;

      return this.response
    } catch (error) {
      this.log(error.stack);
      this.response.body = error;
    }
  }
}
