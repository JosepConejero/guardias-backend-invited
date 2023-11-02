const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  isActivated: { type: Boolean, required: true },
  isDataModifier: { type: Boolean, required: true },
  isTechnician: { type: Boolean, required: true },
  canFLC: { type: Boolean, required: true },
  canSeeStatistics: { type: Boolean, required: true },
  isStillWorking: { type: Boolean, required: true },
  isExternal: { type: Boolean, default: false },
});

UsuarioSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Usuario", UsuarioSchema);
