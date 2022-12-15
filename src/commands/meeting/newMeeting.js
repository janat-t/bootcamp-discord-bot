const { SlashCommandBuilder } = require("discord.js");
const { parseDate } = require("chrono-node");
const Team = require("../../schemas/team");
const autocomplete = require("../../utils/autocomplete");

/**
 *  Command Name: new_meeting
 *  Required Arguments:
 *    team_name   -   The name of the team to create meeting on
 *    title       -   The title of the meeting
 *    date_time   -   The date and time of the meeting
 *  Description:
 *    Schedule a new meeting for a team with team_name
 *    The meeting must have title and date and time
 */
const data = new SlashCommandBuilder()
  .setName("new_meeting")
  .setDescription("Schedule a new meeting")
  .addStringOption((option) =>
    option
      .setName("team_name")
      .setDescription("Team to schedule the meeting")
      .setRequired(true)
      .setAutocomplete(true)
  )
  .addStringOption((option) =>
    option
      .setName("title")
      .setDescription("The title of the meeting")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("date_time")
      .setDescription("Date and time of meeting")
      .setRequired(true)
  );

const execute = async function (interaction) {
  const guildId = interaction.guild.id;

  // Send choices for autocomplete back
  if (interaction.isAutocomplete()) {
    autocomplete(interaction, guildId, "teamName");
  }

  // Schedule the meeting
  if (interaction.isCommand()) {
    console.log("new_meeting command execute.");
    await interaction.deferReply({ ephemeral: false });
    console.log("Schedule a new meeting...");
    const teamName = interaction.options.getString("team_name");
    const title = interaction.options.getString("title");
    const dateStr = interaction.options.getString("date_time");

    // Get date from string
    const date = parseDate(dateStr, Date.now(), { forwardDate: true });

    // Get the team object from database
    const team = await Team.findNameInGuild(teamName, guildId);

    let message = "";
    // Check if there already is a meeting at that time
    if (
      team.meetings.find((meeting) => meeting.date.getTime() === date.getTime())
    ) {
      message = `Team \`${team.teamName}\` alraedy has a meeting at ${date}`;
    }
    // Push new meeting into team and sort by date
    else {
      team.meetings.push({ title, date });
      team.meetings.sort((a, b) => a.date - b.date);
      message = `Meeting "${title}" for team \`${team.teamName}\` is scheduled at ${date}.`;
      // Save team to database
      await team.save().catch(console.error);
    }

    // Set message for reply and log
    console.log(message);
    await interaction.editReply({
      ephemeral: false,
      content: message,
    });
  }
};

module.exports = { data, execute };
