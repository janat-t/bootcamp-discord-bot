const { SlashCommandBuilder } = require("discord.js");
const { ChannelType } = require("discord-api-types/v10");
const Team = require("../../schemas/team");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("teams")
    .setDescription("Show existing teams on the server or a channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Set the base channel of the team")
        .addChannelTypes(ChannelType.GuildText)
    ),

  async execute(interaction) {
    await interaction.deferReply({
      ephemeral: true,
    });

    // Creating log message and reply message.
    let message = "Teams on this server";
    console.log("teams command called");
    const channel = interaction.options.getChannel("channel");
    if (channel) {
      message += " in `#" + channel.name + "`";
    }
    message += ":\n";
    const guildId = interaction.guild.id;

    // Find teams on databases with guildId and channelId (if exists)
    const teams = await Team.find(
      channel ? { guildId, channelId: channel.id } : { guildId }
    );
    console.log(teams);
    if (teams.length === 0) {
      message = "There is no team here.";
    }

    teams.map((team) => {
      message += " - " + team.teamName + "\n";
    });

    // Update reply on discord
    console.log(message);
    await interaction.editReply({
      fetcheReply: true,
      ephemeral: true,
      content: message,
    });
  },
};
