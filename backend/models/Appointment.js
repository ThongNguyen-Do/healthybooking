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
        return value.getTime() > Date.now()
      },
      message: 'Thời gian khám phải lớn hơn thời điểm hiện tại.'
    }
  },
  note: {
    type: String,
    maxlength: 300,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true 
})

module.exports = mongoose.model('Appointment', appointmentSchema)
