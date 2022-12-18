const { SlashCommandBuilder } = require('discord.js');
const moment = require('moment');
const Team = require('../../schemas/team');
const autocomplete = require('../../utils/autocomplete');
const formats = require('../../utils/momentFormat');

/**
 *  Command Name: meetings
 *  Optional Arguments:
 *    team_name   -   The name of the team that meetings is associated with
 *  Description:
 *    List out the meetings in the current server.
 *    If the team_name is specified, list out the meetings for the team.
 */
const data = new SlashCommandBuilder()
  .setName('meetings')
  .setDescription('Show scheduled meeting on the server or a team')
  .addStringOption(option =>
    option
      .setName('team_name')
      .setDescription('Team that meeting is scheduled on')
      .setAutocomplete(true)
  )
  .addBooleanOption(option =>
    option
      .setName('all')
      .setDescription('Show all scheduled meeting including past events')
      .setRequired(false)
  );

const execute = async function (interaction) {
  const guildId = interaction.guild.id;

  // Send choices for autocomplete back
  if (interaction.isAutocomplete()) {
    autocomplete(interaction, guildId, 'teamName');
  }

  // List meetings
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false });
    const teamName = interaction.options.getString('team_name');
    const all = interaction.options.getBoolean('all');
    const meetings = [];
    // If team_name is specified, look for meetings in the team
    if (teamName) {
      const team = await Team.findNameInGuild(teamName, guildId);
      console.log('Team: ', team);
      for (const meeting of team.meetings) {
        meetings.push({
          teamName: team.teamName,
          title: meeting.title,
          date: meeting.date,
        });
      }
    }
    // If team_name is not specified
    else {
      // console.log(teams);
      const teams = await Team.inGuild(guildId);
      for (const team of teams) {
        for (const meeting of team.meetings) {
          if (all || moment(meeting.date).isAfter())
            meetings.push({
              teamName: team.teamName,
              title: meeting.title,
              date: meeting.date,
            });
        }
      }
    }
    console.log(meetings);

    // Generate message for reply
    let message = '';
    meetings.map(m => {
      const line = `\`${m.teamName}\`: **${m.title}** -- ${moment(
        m.date
      ).calendar(null, formats)}\n`;
      message += line;
      return line;
    });
    if (meetings.length === 0) {
      message = 'There is no meeting scheduled here.';
    }

    // Update reply on discord
    console.log(message);
    await interaction.editReply({ ephemeral: false, content: message });
  }
};

module.exports = { data, execute };
