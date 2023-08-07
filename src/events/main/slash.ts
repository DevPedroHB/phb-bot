import { client } from "@/index";
import { Event } from "@/structs/types/event";
import { CommandInteractionOptionResolver } from "discord.js";

export default new Event({
  name: "interactionCreate",
  run(interaction) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    if (interaction.isAutocomplete() && command.autoComplete) {
      command.autoComplete(interaction);

      return;
    }

    if (interaction.isChatInputCommand()) {
      const options = interaction.options as CommandInteractionOptionResolver;

      command.run({ client, interaction, options });

      return;
    }
  },
});
