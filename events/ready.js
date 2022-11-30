const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    const guilds = await client.guilds.fetch();
    console.log("Connected to guilds:");
    guilds.map((g) => console.log("-", g.name));
  },
};
