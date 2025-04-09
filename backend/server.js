const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

// 👉 CORS phải đặt ngay đầu tiên
app.use(cors({
  origin: 'http://localhost:5173', // đúng cổng frontend
  credentials: true
}))

// Middleware để parse JSON body
app.use(express.json())

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/healthybooking')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err))

// Router
app.use('/api/auth', require('./router/auth.router'))

// Test route
app.get('/api/auth/test', (req, res) => {
  res.send('✅ API hoạt động!')
})

// Server chạy
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000')
})
