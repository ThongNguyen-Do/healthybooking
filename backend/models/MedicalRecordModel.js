const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicalRecordSchema = new Schema({
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
    required: true
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  prescription: {
    type: String
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("MedicalRecord", MedicalRecordSchema);
