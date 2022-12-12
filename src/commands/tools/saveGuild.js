const Guild = require("../../schemas/guild");
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guild")
    .setDescription("Returns information from the guild database"),
  async execute(interaction) {
    let curGuild = await Guild.findOne({ guildId: interaction.guild.id });
    if (!curGuild) {
      curGuild = await new Guild({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        guildIcom: interaction.guild.iconURL()
          ? interaction.guild.iconURL()
          : "None",
      });

      await curGuild.save().catch(console.error);
      await interaction.reply({
        content: `Server Name: ${interaction.guild.name}`,
      });
      console.log(curGuild);
    } else {
      await interaction.reply({
        content: `Server ID: ${curGuild.guildId}`,
      });
      console.log(curGuild);
    }
  },
};
