/* eslint-disable no-unused-vars */
const Team = require('./schemas/team');

module.exports = async function run() {
  try {
    // const guild = await Guild.findOne();
    // await Team.deleteMany();
    // const team = await Team.create({
    //   teamName: "mockTeam",
    //   guild: guild._id,
    // });

    // const team = await Team.where().populate("guild");
    // console.log("teams: ", team[0]);

    // const res = await Team.deleteMany({ subTeams: { $exists: false } });
    // console.log(res);

    console.log('Bot running...');
  } catch (e) {
    console.log(e.message);
  }
};
