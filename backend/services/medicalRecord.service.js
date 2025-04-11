

const MedicalRecord = require("../models/MedicalRecordModel");

exports.createMedicalRecord = async (data) => {
  return await MedicalRecord.create(data);
};

exports.getByPatientId = async (patientId) => {
  return await MedicalRecord.find({ patientId }).populate("doctorId", "fullName").sort({ createdAt: -1 });
};

exports.getByAppointmentId = async (appointmentId) => {
  return await MedicalRecord.findOne({ appointmentId }).populate("doctorId patientId");
};
