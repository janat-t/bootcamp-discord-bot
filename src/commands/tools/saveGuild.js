const Guild = require("../../schemas/guild");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guild")
    .setDescription("Returns information from the guild database"),

  async execute(interaction) {
    await interaction.deferReply({
      ephemeral: true,
    });
    const message = await Guild.saveGuild(
      interaction.guild.id,
      interaction.guild.name
    );

    await interaction.editReply({
      ephemeral: false,
      content: message,
    });
  },
};
