const User = require('../models/User')
const { hashPassword } = require('../utils/hash')

const registerUser = async ({ fullName, email, password }) => {
  const existing = await User.findOne({ email })
  if (existing) throw new Error('Email already exists')

  const hashed = await hashPassword(password)

  const user = new User({
    fullName,
    email,
    password: hashed,
    role: 'patient'
  })

  return await user.save()
}

module.exports = {
  registerUser
}
