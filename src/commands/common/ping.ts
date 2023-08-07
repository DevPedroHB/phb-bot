import { Command } from "@/structs/types/command";
import {
  ActionRowBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  Collection,
} from "discord.js";

export default new Command({
  name: "ping",
  description: "reply with pong",
  type: ApplicationCommandType.ChatInput,
  run({ interaction }) {
    const row = new ActionRowBuilder<ButtonBuilder>({
      components: [
        new ButtonBuilder({
          customId: "test-button",
          label: "Clique aqui",
          style: ButtonStyle.Success,
        }),
      ],
    });

    interaction.reply({
      ephemeral: true,
      content: "pong",
      components: [row],
    });
  },
  buttons: new Collection([
    [
      "test-button",
      async (interaction) => {
        interaction.update({ components: [] });
      },
    ],
  ]),
});
