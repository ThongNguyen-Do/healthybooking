const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// Thêm bác sĩ mới
router.post('/doctors', async (req, res) => {
  try {
    const { email, password, fullName } = req.body

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: 'Thiếu thông tin' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newDoctor = new User({
      email,
      password: hashedPassword,
      fullName,
      role: 'doctor',
      status: 'active'
    })

    await newDoctor.save()

    res.json({ message: 'Tạo bác sĩ thành công' })
  } catch (error) {
    console.error('Lỗi khi tạo bác sĩ:', error)
    res.status(500).json({ message: 'Lỗi server' })
  }
})

// Lấy danh sách bác sĩ
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password')
    res.json(doctors)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' })
  }
})

// Lấy danh sách bệnh nhân
router.get('/patients', async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }).select('-password')
    res.json(patients)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' })
  }
})

module.exports = router
