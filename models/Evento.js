const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
  simpleDate: {
    day: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  technicians: [
    {
      technicianId: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: false,
      },
      courseId: { type: Schema.Types.ObjectId, ref: "Curso", required: false },
      isInClientWorkplace: { type: Boolean, required: false },
      uniqueId: { type: String, required: false },
    },
  ],
  isHoliday: { type: Boolean, default: false },
  isThereOffice2h: { type: Boolean, required: true },
  isThereExtraMeeting: { type: Boolean, required: true },
  extraMeetingText: { type: String, required: false },
  note: { type: String, required: false },
  techniciansOut: [
    {
      technicianId: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: false,
      },
    },
  ],
});

EventoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Evento", EventoSchema);
