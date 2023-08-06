import { env } from "@/env";
import {
  BitFieldResolvable,
  Client,
  GatewayIntentsString,
  IntentsBitField,
  Partials,
} from "discord.js";

export class ExtendedClient extends Client {
  constructor() {
    super({
      intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<
        GatewayIntentsString,
        number
      >,
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
      ],
    });
  }

  public start() {
    this.login(env.BOT_TOKEN);
  }
}