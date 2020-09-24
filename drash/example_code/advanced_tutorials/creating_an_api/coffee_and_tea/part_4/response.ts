import { Drash } from "https://deno.land/x/drash/mod.ts";

export default class Response extends Drash.Http.Response {
  public generateResponse(): any {
    let schema = {
      status_code: this.status_code,
      status_message: this.getStatusMessage(),
      data: this.body,
      request: {
        method: this.request.method.toUpperCase(),
        uri: this.request.getUrlPath(this.request)
      }
    };

    return JSON.stringify(schema);
  }
}
