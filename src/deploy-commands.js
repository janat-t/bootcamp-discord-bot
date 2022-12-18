const {
  REST,
  Routes,
  Client,
  GatewayIntentBits,
  Collection,
} = require('discord.js');
const { clientId, guildId, token } = require('../config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.commandArray = [];

require('./functions/handlers/handleCommands')(client);

client.handleCommands();

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${client.commandArray.length} application (/) commands.`
    );
    // The put method is used to fully refresh all commands in the guild with the current set
    let data;
    if (guildId) {
      console.log(`deploying to a guild with id ${guildId}`);
      data = await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: client.commandArray }
      );
    } else {
      console.log(`deploying globally`);
      data = await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });
    }

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
