import { Drash } from "../deps.ts"

const decoder = new TextDecoder()

export class Response extends Drash.Http.Response {

  protected error_codes: number[] = [
    400,
    401,
    403,
    404,
    500
  ];

  public generateResponse (): string {
    if (this.error_codes.indexOf(this.status_code) != -1) {
      try {
        this.body = decoder.decode(Deno.readFileSync(`./src/Error${this.status_code}.html`));
      } catch (error) {
        console.log(error);
      }
    }

    if (!this.body) {
      this.body = decoder.decode(Deno.readFileSync(`./src/Error400.html`));
    }

    return this.body as string
  }
}
