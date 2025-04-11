const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
  try {
    console.log('📥 Body:', req.body);
    console.log('👤 User từ token:', req.user);

    const { doctorId, date, note } = req.body;

    
    if (!req.user || !req.user.id) {
      console.warn('⚠️ Không có thông tin user trong request!');
      return res.status(401).json({ message: 'Không xác định được người dùng từ token' });
    }

    
    if (!doctorId || !date) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin lịch hẹn' });
    }

    
    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      return res.status(400).json({ message: 'Thời gian không hợp lệ' });
    }

    const appointment = await Appointment.create({
      doctor: doctorId,
      patient: req.user.id,
      date: appointmentDate,
      note: note || ''
    });

    console.log('✅ Tạo lịch hẹn thành công:', appointment);

    res.status(201).json(appointment);
  } catch (err) {
    console.error('❌ Lỗi tạo lịch hẹn:', err.message);
    console.error(err.stack);
    res.status(500).json({ message: 'Lỗi server: ' + err.message });
  }
};

module.exports = { createAppointment };
