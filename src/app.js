const fs = require("node:fs");
const path = require("node:path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { token, databaseToken } = require("../config.json");
const { connect } = require("mongoose");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.commandArray = [];

const functionsPath = path.join(__dirname, "functions");
const functionFolders = fs
  .readdirSync(functionsPath)
  .filter((folder) => !folder.startsWith("."));

for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(path.join(functionsPath, folder))
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles) {
    const filePath = path.join(functionsPath, folder, file);
    require(filePath)(client);
  }
}

// Log in to Discord with your client's token
client.handleCommands();
client.handleEvents();
client.login(token);
(async () => {
  await connect(databaseToken).catch(console.error);
})();
