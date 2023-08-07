import { Command } from "@/structs/types/command";
import { ApplicationCommandType } from "discord.js";

export default new Command({
  name: "ping",
  description: "reply with pong",
  type: ApplicationCommandType.ChatInput,
  run({ interaction }) {
    interaction.reply({
      ephemeral: true,
      content: "pong",
    });
  },
});
