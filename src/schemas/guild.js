const { Schema, model } = require("mongoose");
const guildSchema = new Schema(
  {
    _id: String,
    guildName: String,
  },
  { timestamps: true }
);

guildSchema.virtual("guildId").get(function () {
  return this._id;
});

module.exports = new model("Guild", guildSchema, "guilds");
