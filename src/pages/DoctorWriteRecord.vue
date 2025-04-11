<template>
    <div class="record-form">
      <h4>📝 Ghi hồ sơ khám bệnh</h4>
  
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Chẩn đoán</label>
          <textarea v-model="form.diagnosis" required rows="2" />
        </div>
  
        <div class="form-group">
          <label>Đơn thuốc</label>
          <textarea v-model="form.prescription" rows="2" />
        </div>
  
        <div class="form-group">
          <label>Ghi chú thêm</label>
          <textarea v-model="form.notes" rows="2" />
        </div>
  
        <button type="submit">Lưu hồ sơ</button>
      </form>
  
      <p v-if="message" class="success">{{ message }}</p>
    </div>
  </template>
  
  <script>
 import axios from '@/components/utils/axios';

  
  export default {
    name: 'DoctorWriteRecord',
    props: {
      appointmentId: String,
      doctorId: String,
      patientId: String,
    },
    data() {
      return {
        form: {
          diagnosis: '',
          prescription: '',
          notes: '',
        },
        message: '',
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const payload = {
            appointmentId: this.appointmentId,
            doctorId: this.doctorId,
            patientId: this.patientId,
            ...this.form,
          };
  
          await axios.post('/medical-records', payload);
          this.message = '✅ Hồ sơ khám đã được lưu!';
          this.form = { diagnosis: '', prescription: '', notes: '' };
        } catch (err) {
          console.error(err);
          alert('❌ Không thể lưu hồ sơ. Vui lòng thử lại.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .record-form {
    background: #f0f9ff;
    padding: 15px;
    border-radius: 8px;
    margin-top: 10px;
  }
  .form-group {
    margin-bottom: 10px;
  }
  textarea {
    width: 100%;
    padding: 6px;
    border-radius: 4px;
  }
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  .success {
    margin-top: 10px;
    color: green;
  }
  </style>
  