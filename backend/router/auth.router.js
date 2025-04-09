const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

// Route test
router.post('/test-body', (req, res) => {
  console.log(req.body)
  res.json({ message: 'Đã nhận dữ liệu', data: req.body })
})

// Route register
router.post('/register', AuthController.register)

module.exports = router
