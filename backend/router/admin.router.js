const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')


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


router.get('/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password')
    res.json(doctors)
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bác sĩ:', error)
    res.status(500).json({ message: 'Lỗi server' })
  }
})


router.get('/users', async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }).select('-password')
    res.json(patients)
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bệnh nhân:', error)
    res.status(500).json({ message: 'Lỗi server' })
  }
})
router.put('/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { fullName, email } = req.body

    const doctor = await User.findById(id)
    if (!doctor) return res.status(404).json({ message: 'Bác sĩ không tồn tại' })

    doctor.fullName = fullName
    doctor.email = email
    await doctor.save()

    res.json({ message: '✅ Cập nhật bác sĩ thành công' })
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật bác sĩ:', error)
    res.status(500).json({ message: 'Lỗi server' })
  }
})
router.delete('/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params

    const doctor = await User.findById(id)
    if (!doctor) return res.status(404).json({ message: 'Bác sĩ không tồn tại' })

    await doctor.deleteOne()

    res.json({ message: '🗑 Đã xoá bác sĩ thành công' })
  } catch (error) {
    console.error('❌ Lỗi khi xoá bác sĩ:', error)
    res.status(500).json({ message: 'Lỗi server' })
  }
})

router.get('/doctors/active', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor', status: 'active' }).select('fullName email')
    res.json(doctors)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách bác sĩ' })
  }
})



module.exports = router
