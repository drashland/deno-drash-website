import { SubcommandOption } from "../../../../../line/mod.ts";

/**
 * Print a name to the console.
 */
export class LanguageOption extends SubcommandOption {
  public name = "--language";

  public description = "Choose a language.";
}


