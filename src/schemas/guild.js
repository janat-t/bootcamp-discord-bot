const { Schema, model } = require("mongoose");
const guildSchema = new Schema(
  {
    _id: String,
    guildName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

guildSchema.virtual("guildId").get(function () {
  return this._id;
});

// Find guild by guildId
guildSchema.statics.findId = function (guildId) {
  return this.findOne({ _id: guildId });
};

// Create new guild object from guildId and guildName
guildSchema.statics.createGuild = function (guildId, guildName) {
  return new this({
    _id: guildId,
    guildName,
  });
};

//Save guild from guildId and guildName
guildSchema.statics.saveGuild = async function (guildId, guildName) {
  let guild = await this.findId(guildId);
  let message = "n";
  if (!guild) {
    // Guild not found, create a new one
    message = `Saving new Guild "${guildName}".`;
    guild = this.createGuild(guildId, guildName);

    await guild.save().catch(console.error);
    console.log(message);
    return message;
  } else {
    // Guild already exists
    message = `Guild "${guildName}" already exists!`;

    if (guild.guildName !== guildName) {
      // If guildName not same, update the guildName
      message += `\nUpdated name from "${guild.guildName}" to "${guildName}".`;
      guild.guildName = guildName;

      await guild.save().catch(console.error);
    }
    console.log(message);
    return message;
  }
};

module.exports = new model("Guild", guildSchema, "guilds");
