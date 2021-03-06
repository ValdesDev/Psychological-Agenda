const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    summary: { type: String },
    client: { type: Schema.Types.ObjectId, ref: "Client" }
  },
  {
    timestamps: true,
  }
);

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;
