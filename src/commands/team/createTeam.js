const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("team")
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
    )
    .addRoleOption((option) =>
      option.setName("role").setDescription("Set the role of the team")
    ),
  async execute(interaction) {
    await interaction.deferReply({
      ephemeral: true,
    });

    // const { client } = interaction;

    let message = "";
    console.log("team command called");
    const teamName = interaction.options.getString("team_name");
    message += "team name: " + teamName + "\n";
    const channel = interaction.options.getChannel("channel");
    if (channel) {
      message += "channel name: " + channel.name + "\n";
    }
    const role = interaction.options.getRole("role");
    if (role) {
      message += "role name: " + role.name + "\n";
    }
    console.log(message);

    await interaction.editReply({
      fetcheReply: true,
      // ephemeral: true,
      content: message,
    });
  },
};
