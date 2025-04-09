const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  avatarUrl: String,
  status: { type: String, enum: ['pending', 'active'], default: 'pending' },
  role: { type: String, enum: ['admin', 'doctor', 'patient'], default: 'patient' },
  loginCount: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
