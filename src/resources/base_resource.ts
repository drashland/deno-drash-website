import { Drash } from "../../deps.ts";
import { configs } from "../../deps.ts";

const decoder = new TextDecoder();

export class BaseResource extends Drash.Http.Resource {

  /**
   * A list of recognized modules that users can access pages for. If a user
   * tries to access a page for a module that isn't in this list, then an error
   * page will be shown.
   */
  protected recognized_modules: string[] = [
    "dmm",
    "drash",
    "rhum",
    "wocket",
  ];

  //////////////////////////////////////////////////////////////////////////////
  // FILE MARKER - METHODS - PROTECTED /////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Does the file in question exist?
   *
   * @param filename - The name of the file in question.
   *
   * @returns True if the file exists; false if not.
   */
  protected async fileExists(filename: string): Promise<boolean> {
    try {
      await Deno.stat(filename);
      // successful, file or directory must exist
      return true;
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        // file or directory does not exist
        return false;
      } else {
        // unexpected error, maybe permissions, pass it along
        return false;
      }
    }
  }

  /**
   * Get the current environment based on headers and URIs.
   *
   * @returns The environment name.
   */
  protected getEnvironment(): string {
      const host = this.request.headers.get("host") || "";
      const isRunningOnLiveServer = this.request.headers.get("x-forwarded-host");
      const isStaging = host.includes("staging");

      if (isStaging) {
        return "staging";
      }

      if (isRunningOnLiveServer) {
        return "production";
      }

      return "development";
  }

  /**
   * Get the server configs that can be used server-side or client-side. When
   * used client-side, we set a {{ drash_api_configs }} variable in the .html
   * files to the value of this method.
   *
   * @returns The configs as stringified JSON.
   */
  protected getServerConfigs(): string {
    let sanitizedConfigs = configs;
    sanitizedConfigs.root_directory = "***";
    return JSON.stringify(Object.assign(sanitizedConfigs, {
      environment: this.getEnvironment(),
    }));
  }

  /**
   * Log a message for debugging purposes. All resources should use this method.
   * They should NOT use their own console.log() calls. This method allows us to
   * see what resource made the log call.
   */
  protected log(message: string) {
    console.log(`${this.constructor.name} | ${message}`);
  }

  /**
   * Send documentation pages for a module.
   *
   * @param moduleName - The name of the module to use to get the correct
   * documentation pages.
   * @param version - The version of the documentation pages to get. This method
   * will always return versioned documentation pages unless this server is
   * running in a development environment.
   *
   * @returns The repsonse object.
   */
  protected sendDocsPage(moduleName: string, version: string = ""): Drash.Http.Response {
    this.response.body = decoder.decode(Deno.readFileSync("./src/module.html"))
      .replace("{{ title }}", "Drash Land - " + this.ucfirst(moduleName))
      .replace(/\{\{ module \}\}/g, moduleName)
      .replace("{{ drash_api_configs }}", this.getServerConfigs());
      this.response.body = this.response.body.replace(/\{\{ version \}\}/g, version)
    return this.response;
  }

  /**
   * Send an error response with an error status code. Error status codes are
   * 400 and above. Do not use this method to throw codes below 400. Clients
   * parse the status code and handle them as they deem fit. If you throw a code
   * below 400, the client will think the response is a good response and might
   * not handle the response properly.
   *
   * @param code - The error status code (only 400 and above).
   */
  protected sendError(code: number): Drash.Http.Response {
    this.log(`Sending ${code} error response.`);
    this.response.status_code = code;
    return this.response;
  }

  /**
   * Send versioned documentation pages. Versioned documentation pages are just
   * Vue apps with the name of the module and the version. For example:
   *
   *     drash.v1.3.0.js
   *
   * See /assets/bundles for all versioned documentation.
   *
   * @param moduleName - The name of the module to use to get the correct
   * documentation pages.
   * @param version - The version of the documentation pages to get.
   */
  protected async sendVersionedDocsPage(
    moduleName: string,
    version: string
  ): Promise<Drash.Http.Response> {
    let filename = `./assets/bundles/${moduleName}.${version}.js`;

    this.log(`Getting Vue app: ${filename}`);

    if (!await this.fileExists(filename)) {
      this.log(`Module version "${version}" unknown.`);
      return this.sendError(404);
    }

    return this.sendDocsPage(moduleName, version);
  }

  /**
   * A utility method to help capitalize first letters of strings.
   *
   * @param str - The string to mutate.
   *
   * @returns The string with its first letter capitalized.
   */
  protected ucfirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
