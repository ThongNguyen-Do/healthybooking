const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors({
  origin: 'http://localhost:5173', // đúng với frontend Vue Vite
  credentials: true                // quan trọng nếu dùng cookie/token
}))

// Middleware để parse JSON body
app.use(express.json())

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/healthybooking')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err))

// Router
app.use('/api/auth', require('./router/auth.router'))
app.use('/api/admin', require('./router/admin.router'))
app.use('/api', require('./router/admin.router')) 


// Test route
app.get('/api/auth/test', (req, res) => {
  res.send('✅ API hoạt động!')
})

// Server chạy
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000')
})