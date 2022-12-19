const { SlashCommandBuilder, ChannelType } = require('discord.js');
const Team = require('../../schemas/team');

/**
 *  Command Name: new_team
 *  Required Arguments: team_name
 *  Optional Arguments: channel, role
 *  Description:
 *    Create a new team and save to the database.
 *    If the channel and role is specified, save them to the team.
 */
const data = new SlashCommandBuilder()
  .setName('new_team')
  .setDescription('Create team in a text channel')
  .addStringOption(option =>
    option
      .setName('team_name')
      .setDescription('Set the team name')
      .setRequired(true)
  )
  .addChannelOption(option =>
    option
      .setName('channel')
      .setDescription('Set the base channel of the team')
      .addChannelTypes(ChannelType.GuildText)
  )
  .addRoleOption(option =>
    option.setName('role').setDescription('Set the role of the team')
  );

const execute = async function execute(interaction) {
  await interaction.deferReply({
    ephemeral: false,
  });

  // Creating log message and reply message.
  let message = '';
  console.log('new_team command called');
  const teamName = interaction.options.getString('team_name');
  message += `Team name: \`${teamName}\`\n`;
  const channel = interaction.options.getChannel('channel');
  if (channel) {
    message += `Channel name: \`#${channel.name}\`\n`;
  }
  const role = interaction.options.getRole('role');
  if (role) {
    message += `Role name: \`${role.name}\`\n`;
  }
  const { guild } = interaction;

  // Check if team name alraedy exist
  if (await Team.exists({ teamName, 'guild.id': guild.id })) {
    message = `Team named \`${teamName}\` alraedy exist on this server.`;
  }
  // Create Team object to be saved
  else {
    await Team.create({
      teamName,
      guild: { guildId: guild.id, guildName: guild.name },
      channel: channel
        ? { channelId: channel.id, channelName: channel.name }
        : {},
      role: role ? { roleId: role.id, roleName: role.name } : {},
    });
    // console.log(`new teamId: ${team._id}`);
  }

  // Update reply on discord
  console.log(message);
  await interaction.editReply({
    fetcheReply: true,
    ephemeral: false,
    content: message,
  });
};

module.exports = { data, execute };
