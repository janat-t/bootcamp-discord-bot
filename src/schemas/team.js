const { Schema, model, SchemaTypes } = require("mongoose");

const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    members: [String], // userId
    channelId: String,
    roleId: String,
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
    guildId: {
      type: String,
      ref: "Guild",
      required: true,
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
