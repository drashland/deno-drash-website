import { BaseResource } from "./base_resource.ts";
import { configs } from "../../configs.js";

const decoder = new TextDecoder();

interface IRoadmaps {
  [k: string]: IRoadmapData
}

interface IRoadmapData {
  repoUri: string;
  // deno-lint-ignore no-explicit-any
  issues: any;
}

const cacheRoadmaps: IRoadmaps = {
  "Drash": {
    repoUri: "deno-drash",
    issues: [],
  },
  "Drash Middleware": {
    repoUri: "deno-drash-middleware",
    issues: [],
  },
  "Dmm": {
    repoUri: "dmm",
    issues: [],
  },
  "Line": {
    repoUri: "line",
    issues: [],
  },
  "Rhum": {
    repoUri: "rhum",
    issues: [],
  },
  "Sinco": {
    repoUri: "sinco",
    issues: [],
  },
  "Website": {
    repoUri: "website",
    issues: [],
  },
  "Wocket": {
    repoUri: "wocket",
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
    const username = configs.github_api.user;
    const password = configs.github_api.password;
    const authString = `${username}:${password}`;
    const headers = new Headers();
    headers.set("Authorization", "Basic " + btoa(authString));

    for (const moduleName in cacheRoadmaps) {
      if (cacheRoadmaps[moduleName].issues.length <= 0) {
        const uri = cacheRoadmaps[moduleName].repoUri;
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
