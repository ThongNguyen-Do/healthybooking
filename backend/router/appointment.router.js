const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const { createAppointment } = require('../controllers/appointmentController')

router.post('/', auth, createAppointment)

module.exports = router
