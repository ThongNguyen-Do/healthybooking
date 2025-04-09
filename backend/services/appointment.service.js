const Appointment = require('../models/Appointment')

const createAppointment = async (data) => {
  return await Appointment.create(data)
}

const getAllAppointments = async () => {
  return await Appointment.find().populate('doctorId')
}

module.exports = {
  createAppointment,
  getAllAppointments
}
