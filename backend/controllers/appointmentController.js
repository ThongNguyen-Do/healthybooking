const Appointment = require('../models/Appointment')

const createAppointment = async (req, res) => {
  try {
    console.log('📥 Body:', req.body)
    console.log('👤 User từ token:', req.user)

    const { doctorId, date, note } = req.body

    const appointment = await Appointment.create({
      doctor: doctorId,          // ✅ khớp với schema
      patient: req.user.id,      // ✅ khớp với schema
      date,
      note
    })

    console.log('✅ Tạo lịch hẹn thành công:', appointment)

    res.status(201).json(appointment)
  } catch (err) {
    console.error('❌ Lỗi tạo lịch hẹn:', err)
    res.status(400).json({ message: err.message })
  }
}

module.exports = { createAppointment }
