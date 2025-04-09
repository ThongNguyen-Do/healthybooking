const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  note: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Appointment', appointmentSchema)
