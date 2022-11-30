const path = require("node:path");
const fs = require("node:fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandsPath = "./src/commands";
    const commandFolders = fs
      .readdirSync(commandsPath)
      .filter((file) => !file.startsWith("."));

    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(path.join(commandsPath, folder))
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const filePath = path.join("../../commands", folder, file);
        const command = require(filePath);

        if ("data" in command && "execute" in command) {
          client.commands.set(command.data.name, command);
          console.log(`loaded command ${command.data.name}`);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      }
    }
  };
};
