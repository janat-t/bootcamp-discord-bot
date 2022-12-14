const { Schema, model, SchemaTypes } = require("mongoose");

const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    members: [String], // userId
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
      ref: "Team",
    },
    subTeams: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Team",
      },
    ],
    guild: {
      guildId: {
        type: String,
        required: true,
      },
      guildName: String,
    },
  },
  {
    timestamps: true,
  }
);

teamSchema.virtual("teamId").get(function () {
  return this._id;
});

teamSchema.statics.findId = function (teamId) {
  return this.findOne({ _id: teamId });
};

module.exports = new model("Team", teamSchema, "teams");
