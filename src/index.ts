import config from "./config.json";
import { ExtendedClient } from "./structs/extended-client";

const client = new ExtendedClient();

client.start();

export * from "colors";
export { client, config };
