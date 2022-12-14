const { Schema, model } = require("mongoose");

const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    guildId: { type: String, ref: "Guild", required: true },
    channelId: String,
    roleId: String,
  },
  { timestamps: true }
);

module.exports = new model("Team", teamSchema, "teams");
