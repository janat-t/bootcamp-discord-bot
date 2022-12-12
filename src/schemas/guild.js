const { Schema, SchemaTypes, model } = require("mongoose");
const guildSchema = new Schema(
  {
    _id: SchemaTypes.ObjectId,
    guildId: String,
    guildName: String,
  },
  { timestamps: true }
);

module.exports = new model("Guild", guildSchema, "guilds");
