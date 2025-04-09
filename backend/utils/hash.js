const bcrypt = require('bcrypt')

const hashPassword = async (plain) => await bcrypt.hash(plain, 10)
const comparePassword = async (plain, hash) => await bcrypt.compare(plain, hash)

module.exports = { hashPassword, comparePassword }
