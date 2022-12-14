const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    // Fetch Guilds
    const guilds = await client.guilds.fetch();

    // const channels = await client.channels.cache;
    // channels.map((c) => console.log(`${c.guild.name}:${c.name} ${c.type}`));
    console.log("Connected to guilds:");
    guilds.map((g) => console.log("-", g.name));
  },
};
