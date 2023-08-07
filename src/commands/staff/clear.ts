import { Command } from "@/structs/types/command";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  GuildMember,
} from "discord.js";

export default new Command({
  name: "limpar",
  description: "🗑️ Limpa mensagens no chat.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "quantidade",
      description: "🔢 O total de mensagens a serem excluídas.",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: "author",
      description: "👤 Limpar mensagens de apenas um membro (opcional).",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  async run({ interaction, options }) {
    if (!interaction.inCachedGuild()) return;

    const { channel } = interaction;

    await interaction.deferReply({ ephemeral: true });

    const amount = Math.min(options.getInteger("quantidade", true), 100);
    const mention = options.getMember("author") as GuildMember | null;

    if (!channel) {
      return interaction.editReply({
        content: "❌ Não é possível limpar mensagens!",
      });
    }

    const messages = mention
      ? await channel.messages.cache
          .filter((message) => message.author.id === mention.id)
          .first(amount)
      : (await channel.messages.fetch()).first(amount);

    if (!messages.length) {
      return interaction.editReply({
        content: mention
          ? `❌ Não foi encontrada nenhuma mensagem recente de ${mention}.`
          : `❌ Não foi encontrada nenhuma mensagem recente em ${channel}.`,
      });
    }

    try {
      const cleared = await channel.bulkDelete(messages, true);

      return interaction.editReply({
        content: mention
          ? `🗑️ Foram limpas ${cleared.size} mensagens de ${mention}.`
          : `🗑️ Foram limpas ${cleared.size} mensagens em ${channel}.`,
      });
    } catch (error) {
      return interaction.editReply({
        content: mention
          ? `❌ Ocorreu um erro ao tentar limpar as mensagens de ${mention}! \n${error}`
          : `❌ Ocorreu um erro ao tentar limpar as mensagens em ${channel}! \n${error}`,
      });
    }
  },
});
