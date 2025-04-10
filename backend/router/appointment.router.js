const express = require('express')
const router = express.Router()
const Appointment = require('../models/Appointment')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const mongoose = require('mongoose') // 👈 THÊM dòng này nếu chưa có

// Middleware kiểm tra token và gán req.user
const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Thiếu token' })

  try {
    const decoded = jwt.verify(token, 'secret_key') // Đổi 'secret_key' bằng key thật của bạn
    const user = await User.findById(decoded.id)
    if (!user) return res.status(401).json({ message: 'Người dùng không hợp lệ' })

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ' })
  }
}

// ✅ Tạo lịch hẹn mới
router.post('/', requireAuth, async (req, res) => {
  try {
    const { doctorId, date, note } = req.body

    if (!doctorId || !date) {
      return res.status(400).json({ message: 'Thiếu thông tin đặt lịch' })
    }

    // ✅ Kiểm tra ObjectId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: 'doctorId không hợp lệ' })
    }

    const newAppointment = new Appointment({
      doctor: doctorId, // ✅ đúng tên trong schema
      patient: req.user._id, // ✅ đúng tên trong schema
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
module.exports = router
