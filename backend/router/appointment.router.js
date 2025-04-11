const express = require('express')
const router = express.Router()
const Appointment = require('../models/Appointment')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Thiếu token' })

  try {
    const decoded = jwt.verify(token, 'secret_key') 
    const user = await User.findById(decoded.id)
    if (!user) return res.status(401).json({ message: 'Người dùng không hợp lệ' })

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ' })
  }
}


router.post('/', requireAuth, async (req, res) => {
  try {
    const { doctorId, date, note } = req.body

    if (!doctorId || !date) {
      return res.status(400).json({ message: 'Thiếu thông tin đặt lịch' })
    }

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: 'doctorId không hợp lệ' })
    }

    const newAppointment = new Appointment({
      doctor: doctorId,
      patient: req.user._id,
      date,
      note
    })

    await newAppointment.save()
    res.json({ message: 'Đặt lịch thành công' })
  } catch (error) {
    console.error('❌ Lỗi khi đặt lịch:', error)
    res.status(500).json({ message: 'Lỗi server khi đặt lịch' })
  }
})

router.get('/my', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ message: 'Chỉ bác sĩ mới được xem lịch của mình' })
    }

    const appointments = await Appointment.find({ doctor: req.user._id })
      .populate('patient', 'fullName email')
      .sort({ date: 1 })

    res.json(appointments)
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi lấy lịch hẹn' })
  }
})

module.exports = router
