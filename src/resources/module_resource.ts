import { BaseResource } from "./base_resource.ts";
import { configs } from "../../deps.ts";

export class ModuleResource extends BaseResource {
  static paths = [
    "/:module/:version?",
  ];

  //////////////////////////////////////////////////////////////////////////////
  // FILE MARKER - METHODS - HTTP //////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  public GET() {
    const moduleName = this.request.getPathParam("module") as string;
    let version = this.request.getPathParam("version") as string;

    this.log(`Requested docs for "${moduleName}" module.`);

    if (this.recognized_modules.indexOf(moduleName) == -1) {
      this.log(`Module "${moduleName}" unknown.`);
      return this.sendError(404);
    }

    if (version) {
      return this.sendVersionedDocsPage(moduleName, version);
    }

    // @ts-ignore (crookse) We ignore this because we can't use a dynamic
    // variable to index the configs which are not typed.
    version = configs[moduleName].latest_version.split(".")[0] + ".x";

    return this.response.redirect(302, `/${moduleName}/${version}/`);
  }
}
