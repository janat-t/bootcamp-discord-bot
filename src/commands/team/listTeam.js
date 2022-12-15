const { SlashCommandBuilder, ChannelType } = require("discord.js");
const Team = require("../../schemas/team");

/**
 *  Command Name: teams
 *  Optional Arguments: channel
 *  Description:
 *    List out the teams in the current server.
 *    If the channel is specified, list out the teams on the channel
 */
const data = new SlashCommandBuilder()
  .setName("teams")
  .setDescription("Show existing teams on the server or a channel")
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("Base channel for teams")
      .addChannelTypes(ChannelType.GuildText)
  );

const execute = async function (interaction) {
  await interaction.deferReply({
    ephemeral: false,
  });

  // Creating log message and reply message.
  let message = "Teams on this server";
  console.log("teams command called");
  const channel = interaction.options.getChannel("channel");
  if (channel) {
    message += ` in \`${channel.name}\``;
  }
  message += ":\n";
  const guild = interaction.guild;

  // Find teams on databases with guildId and channelId (if exists)
  const teams = await Team.find(
    channel
      ? {
          "guild.guildId": guild.id,
          "channel.channelId": channel.id,
        }
      : { "guild.guildId": guild.id }
  );
  // console.log(teams);
  if (teams.length === 0) {
    message = "There is no team here.";
  }

  teams.map((team) => {
    message += ` - \`${team.teamName}\`\n`;
  });

  // Update reply on discord
  console.log(message);
  await interaction.editReply({
    fetcheReply: true,
    ephemeral: false,
    content: message,
  });
};

module.exports = { data, execute };
