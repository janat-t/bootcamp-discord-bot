const { Schema, model, SchemaTypes } = require('mongoose');

const meetingSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
});

const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    members: [String], // userId
    meetings: [meetingSchema],
    channel: {
      channelId: String,
      channelName: String,
    },
    role: {
      roleId: String,
      roleName: String,
    },
    parentTeam: {
      type: SchemaTypes.ObjectId,
      ref: 'Team',
    },
    subTeams: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Team',
      },
    ],
    guild: {
      guildId: {
        type: String,
        required: true,
      },
      guildName: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

teamSchema.virtual('teamId').get(function () {
  return this._id;
});

teamSchema.statics.findId = function (teamId) {
  return this.findOne({ _id: teamId });
};

teamSchema.statics.inGuild = function (guildId) {
  return this.find({ 'guild.guildId': guildId });
};

teamSchema.statics.findNameInGuild = function (teamName, guildId) {
  return this.findOne({ 'guild.guildId': guildId, teamName });
};

// eslint-disable-next-line new-cap
module.exports = new model('Team', teamSchema, 'teams');
