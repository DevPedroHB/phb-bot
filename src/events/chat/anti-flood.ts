/* eslint-disable indent */
import { config } from "@/index";
import { Event } from "@/structs/types/event";
import { Collection, ColorResolvable, EmbedBuilder, italic } from "discord.js";

const members: Collection<string, number> = new Collection();

export default new Event({
  name: "messageCreate",
  async run(message) {
    if (!message.inGuild()) return;
    if (message.author.bot) return;
    if (message.author.id === message.guild.ownerId) return;
    if (message.member?.permissions.has("Administrator")) return;

    const { author, channel, member } = message;
    const count = members.get(author.id);

    if (!count) {
      members.set(author.id, 1);
      return;
    }

    const newCount = count + 1;
    members.set(author.id, newCount);

    if (newCount >= 5) {
      members.delete(author.id);

      member?.timeout(60_000, "Flood de mensagens");

      const embed = new EmbedBuilder({
        description: `🚫 ${author}, evite o flood de mensagens por favor!
                > Leia as regras do servidor para evitar punições severas.
                ${italic(
                  "Você poderá enviar mensagens novamente em breve..."
                )}`,
      }).setColor(config.colors["red-dark"] as ColorResolvable);

      const msg = await channel.send({
        content: `⛔ ||${author}||`,
        embeds: [embed],
      });

      setTimeout(() => msg.delete().catch(() => {}), 60_000);

      return;
    }

    setTimeout(() => {
      const currCount = members.get(author.id);

      if (!currCount) return;

      members.set(author.id, currCount - 1);
    }, 6000);
  },
});
