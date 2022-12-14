const { Events } = require("discord.js");
const Guild = require("../../schemas/guild");

module.exports = {
  name: Events.GuildCreate,
  async execute(guild) {
    console.log(`Joined guild "${guild.name}"`);

    // Save the new guild into the database
    await Guild.saveGuild(guild.id, guild.name);
  },
};
