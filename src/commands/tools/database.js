const Guild = require("../../schemas/guild");
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("database")
    .setDescription("Returns information from the database"),
  async execute(interaction) {
    let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
    if (!guildProfile) {
      guildProfile = await new Guild({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        guildIcom: interaction.guild.iconURL()
          ? interaction.guild.iconURL()
          : "None",
      });

      await guildProfile.save().catch(console.error);
      await interaction.reply({
        content: `Server Name: ${interaction.guild.name}`,
      });
      console.log(guildProfile);
    } else {
      await interaction.reply({
        content: `Server ID: ${guildProfile.guildId}`,
      });
      console.log(guildProfile);
    }
  },
};
