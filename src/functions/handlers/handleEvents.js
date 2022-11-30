const path = require("node:path");
const fs = require("node:fs");
const { connection } = require("mongoose");

module.exports = (client) => {
  client.handleEvents = async () => {
    const eventsPath = "./src/events";
    const eventFolders = fs
      .readdirSync(eventsPath)
      .filter((folder) => !folder.startsWith("."));

    for (const folder of eventFolders) {
      const eventFiles = fs
        .readdirSync(path.join(eventsPath, folder))
        .filter((file) => file.endsWith(".js"));

      switch (folder) {
        case "client":
          for (const file of eventFiles) {
            const filePath = path.join("../../events", folder, file);
            const event = require(filePath);

            if (event.once) {
              client.once(event.name, (...args) => event.execute(...args));
            } else {
              client.on(event.name, (...args) => event.execute(...args));
            }
            console.log(`loaded event: ${event.name}.`);
          }
          break;

        case "mongo":
          for (const file of eventFiles) {
            const filePath = path.join("../../events", folder, file);
            const event = require(filePath);

            if (event.once)
              connection.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            else
              connection.on(event.name, (...args) =>
                event.execute(...args, client)
              );
          }
          break;

        default:
          break;
      }
    }
  };
};
