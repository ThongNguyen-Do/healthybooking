const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const AuthController = {
  // ✅ ĐĂNG KÝ
  register: async (req, res) => {
    try {
      console.log('📥 Dữ liệu nhận được:', req.body)

      const { email, password, fullName, role } = req.body

      if (!email || !password || !fullName || !role) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' })
      }

      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'Email đã được sử dụng' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = new User({
        email,
        password: hashedPassword,
        fullName,
        role,
        status: 'pending',
        loginCount: 0
      })

      await newUser.save()

      res.status(201).json({ message: 'Đăng ký thành công!' })
    } catch (err) {
      console.error('❌ Lỗi đăng ký:', err)
      res.status(500).json({ message: 'Lỗi server', error: err.message })
    }
  },

  // ✅ ĐĂNG NHẬP
  login: async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Email không tồn tại' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Sai mật khẩu' })
      }

      user.loginCount += 1
      await user.save()

      const token = jwt.sign(
        { id: user._id, role: user.role },
        'secret_key', // 👉 NÊN để trong biến môi trường
        { expiresIn: '7d' }
      )

      res.json({
        message: 'Đăng nhập thành công',
        token,
        role: user.role
      })

    } catch (err) {
      console.error('❌ Lỗi login:', err)
      res.status(500).json({ message: 'Lỗi server khi đăng nhập' })
    }
  }
}

module.exports = AuthController
