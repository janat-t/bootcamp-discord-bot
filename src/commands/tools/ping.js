const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Self Introduction"),
  async execute(interaction) {
    console.log("ping");
    await interaction.reply("Hi! I'm a cat!");
  },
};
