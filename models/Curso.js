const { Schema, model } = require("mongoose");

const CursoSchema = Schema({
  title: { type: String, required: true },
  frequent: { type: Boolean, required: true },
  flc: { type: Boolean, required: true },
});

CursoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Curso", CursoSchema);
