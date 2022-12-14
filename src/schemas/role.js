const { Schema, model } = require("mongoose");

const roleSchema = new Schema(
  {
    _id: String,
    roleName: String,
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

roleSchema.virtual("roleId").get(function () {
  return this._id;
});

roleSchema.statics.findId = function (roleId) {
  return this.findOne({ _id: roleId });
};

roleSchema.statics.findByGuildId = function (guildId) {
  return this.find({ guildId });
};

module.exports = new model("Role", roleSchema, "roles");
