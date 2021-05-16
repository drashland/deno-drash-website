import { BaseResource } from "./base_resource.ts";
import { configs } from "../../configs.js";

const decoder = new TextDecoder();

let cacheRoadmaps: any = {
  "Drash": {
    repo_uri: "deno-drash",
    issues: [],
  },
  "Drash Middleware": {
    repo_uri: "deno-drash-middleware",
    issues: [],
  },
  "Dmm": {
    repo_uri: "dmm",
    issues: [],
  },
  "Line": {
    repo_uri: "line",
    issues: [],
  },
  "Rhum": {
    repo_uri: "rhum",
    issues: [],
  },
  "Sinco": {
    repo_uri: "sinco",
    issues: [],
  },
  "Website": {
    repo_uri: "website",
    issues: [],
  },
  "Wocket": {
    repo_uri: "wocket",
    issues: [],
  },
};

export class LandingResource extends BaseResource {
  static paths = [
    "/",
  ];

  //////////////////////////////////////////////////////////////////////////////
  // FILE MARKER - METHODS - HTTP //////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  public async GET() {
    await this.log("Requested landing page.");

    const filename = "./src/views/landing.html";

    if (!await this.fileExists(filename)) {
      return await this.sendError(404);
    }

    try {
      let content = decoder.decode(Deno.readFileSync(filename));
      const environment = this.getEnvironment();
      const titleSuffix = environment != "production"
        ? ` [${environment}]`
        : "";
      content = content
        .replace("{{ title }}", "Drash Land" + titleSuffix)
        .replace("{{ drash_api_configs }}", this.getServerConfigs())
        .replace("{{ roadmaps }}", await this.getRoadmaps());

      this.response.body = content;

      return this.response;
    } catch (error) {
      await this.log(error.stack);
      this.response.body = error;
    }
  }

  protected async getRoadmaps(): Promise<string> {
    let username = configs.github_api.user;
    let password = configs.github_api.password;
    let authString = `${username}:${password}`;
    let headers = new Headers();
    headers.set("Authorization", "Basic " + btoa(authString));

    for (let moduleName in cacheRoadmaps) {
      if (cacheRoadmaps[moduleName].issues.length <= 0) {
        const uri = cacheRoadmaps[moduleName].repo_uri;
        const res = await fetch(
          `https://api.github.com/repos/drashland/${uri}/issues?state=all&labels=Sprint:%202021%20Semester%201`,
          {
            headers: headers,
          },
        );
        const json = await res.json();
        cacheRoadmaps[moduleName].issues = json;
      }
    }

    return JSON.stringify(cacheRoadmaps);
  }
}
