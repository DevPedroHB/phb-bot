import { ExtendedClient } from "./structs/extended-client";

export * from "colors";

export const client = new ExtendedClient();

client.start();

client.on("ready", () => {
  console.log("Bot online".green);
});

client.on("messageCreate", (message) => {
  if (message.author.id === client.user?.id) return;

  message.reply({
    content: `Olá ${message.author.username}`,
  });
});
