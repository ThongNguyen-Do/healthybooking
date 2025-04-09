const Appointment = require('../models/Appointment')

const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, note } = req.body

    const appointment = await Appointment.create({
      doctorId,
      patientId: req.user.id,
      date,
      note
    })

    res.status(201).json(appointment)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = { createAppointment }
