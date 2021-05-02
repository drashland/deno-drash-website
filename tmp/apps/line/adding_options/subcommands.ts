import { Subcommand } from "../../../../../line/mod.ts";
import { LanguageOption } from "./options.ts";

/**
 * Greet users.
 */
export class GreetSubcommand extends Subcommand {
  public signature = "greet [name]";

  public description = "Greet users.";

  public options = [
    LanguageOption
  ];

  public handle(): void {
    const name = this.getArgumentValue("name"); // Matches [name] in the signature

    if (!name) {
      this.showHelp();
      return;
    }

    // Check for the option
    const language = this.getOptionValue("--language");

    // Change the functionality of the subcommand based on the option
    let greeting = "Hello";
    if (language) {
      switch (language.toLowerCase()) {
        case "french":
          greeting = "Bonjour";
          break;
        case "italian":
          greeting = "Ciao";
          break;
        case "spanish":
          greeting = "Hola";
          break;
        default:
          break;
      }
    }

    console.log(`${greeting}, ${name}!`);
  }
}
