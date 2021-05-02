import { Subcommand } from "../../../../../line/mod.ts";

/**
 * Read files.
 */
export class ReadSubcommand extends Subcommand {
  public signature = "read [source]";

  public description = "Read the contents of a file.";

  public options = [];

  public handle(): void {
    const source = this.getArgumentValue("source"); // matches [source] in the signature

    if (!source) {
      this.showHelp();
      return;
    }

    const contents = new TextDecoder().decode(Deno.readFileSync(source));
    console.log(contents);
  }
}

/**
 * Write files.
 */
export class WriteSubcommand extends Subcommand {
  public signature = "write [source] [text]";

  public description = "Write text to a file.";

  public options = [];

  public handle(): void {
    const source = this.getArgumentValue("source"); // matches [source] in the signature
    const text = this.getArgumentValue("text"); // matches [text] in the signature

    if (!source || !text) {
      this.showHelp();
      return;
    }

    try {
      Deno.writeFileSync(source, new TextEncoder().encode(text));
      console.log(`Successfully wrote '${source}'.`);
    } catch (error) {
      console.log(`Failed to write '${source}'.`);
    }
  }
}
