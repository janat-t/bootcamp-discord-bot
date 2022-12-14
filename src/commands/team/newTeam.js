const { SlashCommandBuilder } = require("discord.js");
const { ChannelType } = require("discord-api-types/v10");
const Team = require("../../schemas/team");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("new_team")
    .setDescription("Create team in a text channel")
    .addStringOption((option) =>
      option
        .setName("team_name")
        .setDescription("Set the team name")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Set the base channel of the team")
        .addChannelTypes(ChannelType.GuildText)
    )
    .addRoleOption((option) =>
      option.setName("role").setDescription("Set the role of the team")
    ),

  async execute(interaction) {
    await interaction.deferReply({
      ephemeral: true,
    });

    // Creating log message and reply message.
    let message = "";
    console.log("team command called");
    const teamName = interaction.options.getString("team_name");
    message += "team name: `" + teamName + "`\n";
    const channel = interaction.options.getChannel("channel");
    if (channel) {
      message += "channel name: `" + channel.name + "`\n";
    }
    const role = interaction.options.getRole("role");
    if (role) {
      message += "role name: `" + role.name + "`\n";
    }
    const guildId = interaction.guild.id;

    // Check if team name alraedy exist
    if (await Team.exists({ teamName, guildId })) {
      message = "team name alraedy exist";
    } else {
      // Create Team object to be saved
      const team = await Team.create({
        teamName,
        guildId,
        channelId: channel ? channel.id : "",
        roleId: role ? role.id : "",
      });

      // Save the created team into database
    }

    // Update reply on discord
    console.log(message);
    await interaction.editReply({
      fetcheReply: true,
      ephemeral: true,
      content: message,
    });
  },
};
