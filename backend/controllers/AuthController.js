const User = require('../models/User')
const bcrypt = require('bcrypt')

const AuthController = {
  register: async (req, res) => {
    try {
      console.log('📥 Dữ liệu nhận được:', req.body)

      const { email, password, fullName, role } = req.body // ✅ ĐÃ THÊM role

      // Kiểm tra dữ liệu
      if (!email || !password || !fullName || !role) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' })
      }

      // Kiểm tra trùng email
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'Email đã được sử dụng' })
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10)

      // Tạo user mới
      const newUser = new User({
        email,
        password: hashedPassword,
        fullName,
        role, // ✅ ĐÃ GÁN role từ frontend
        status: 'pending'
      })

      await newUser.save()

      res.status(201).json({ message: 'Đăng ký thành công!' })
    } catch (err) {
      console.error('❌ Lỗi đăng ký:', err)
      res.status(500).json({ message: 'Lỗi server', error: err.message })
    }
  }
}

module.exports = AuthController
