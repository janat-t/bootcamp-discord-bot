const { Schema, model, SchemaTypes } = require("mongoose");

const teamSchema = new Schema(
  {
    _id: SchemaTypes.ObjectId,
    teamName: {
      type: String,
      required: true,
    },
    guild: { type: SchemaTypes.ObjectId, ref: "Guild" },
    channel: String,
    role: String,
  },
  { timestamps: true }
);

module.exports = new model("Team", teamSchema);
