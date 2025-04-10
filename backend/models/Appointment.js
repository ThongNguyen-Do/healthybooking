  const mongoose = require('mongoose')

  const appointmentSchema = new mongoose.Schema({
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > new Date() // Không cho đặt lịch trong quá khứ
        },
        message: 'Thời gian khám phải lớn hơn thời điểm hiện tại.'
      }
    },
    note: {
      type: String,
      maxlength: 300
    }
  }, {
    timestamps: true
  })

  module.exports = mongoose.model('Appointment', appointmentSchema)
