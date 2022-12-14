const Guild = require("../../schemas/guild");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guild")
    .setDescription("Returns information from the guild database"),

  async execute(interaction) {
    let curGuild = await Guild.findOne({ _id: interaction.guild.id });
    if (!curGuild) {
      curGuild = await new Guild({
        _id: interaction.guild.id,
        guildName: interaction.guild.name,
      });

      await curGuild.save().catch(console.error);
      await interaction.reply({
        content: `Server Name: ${interaction.guild.name}`,
      });
      console.log(curGuild);
    } else {
      await interaction.reply({
        content: `Server ID: ${curGuild._id}`,
      });
      console.log(curGuild);
    }
  },
};
