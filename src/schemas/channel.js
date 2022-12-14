const { Schema, model } = require("mongoose");

const channelSchema = new Schema(
  {
    _id: String,
    channelName: {
      type: String,
      required: true,
    },
    guildId: {
      type: String,
      ref: "Guild",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

channelSchema.virtual("channelId").get(function () {
  return this._id;
});

channelSchema.statics.findId = function (channelId) {
  return this.findOne({ _id: channelId });
};

module.exports = new model("Channel", channelSchema, "channels");
