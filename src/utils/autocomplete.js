const Team = require('../schemas/team');

module.exports = async function autocomplete(interaction, guildId, field) {
  if (field === 'teamName') {
    const choices = [];
    const teamName = interaction.options.getString('team_name').split('');
    // Get team list that matches team_name from database
    const teams = await Team.getTeamNameRegex(
      `.*${teamName.join('.*')}`,
      guildId
    );

    // Create choices for autocomplete
    teams.map(team =>
      choices.push({ name: team.teamName, value: team.teamName })
    );
    console.log(
      `teamName autocomplete: ${interaction.options.getString('team_name')}`
    );
    interaction.respond(choices).catch(console.error);
  } else {
    console.error('invalid field');
  }
};
