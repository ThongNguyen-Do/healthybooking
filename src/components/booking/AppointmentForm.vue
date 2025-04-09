<template>
    <div class="form-container">
      <h2>🩺 Đặt lịch khám bệnh</h2>
  
      <form @submit.prevent="submitAppointment">
        <label>Bác sĩ</label>
        <select v-model="form.doctorId" required>
          <option disabled value="">-- Chọn bác sĩ --</option>
          <option v-for="doc in doctors" :key="doc._id" :value="doc._id">
            {{ doc.name }}
          </option>
        </select>
  
        <label>Thời gian khám</label>
        <input type="datetime-local" v-model="form.date" required />
  
        <label>Ghi chú</label>
        <textarea v-model="form.note" rows="3" placeholder="Nhập ghi chú..."></textarea>
  
        <button type="submit">Đặt lịch</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const form = ref({
    doctorId: '',
    date: '',
    note: ''
  })
  
  const doctors = ref([])
  
  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/doctors')
      doctors.value = res.data
    } catch (err) {
      console.error('Lỗi khi lấy danh sách bác sĩ:', err)
    }
  }
  
  const submitAppointment = async () => {
    try {
      const token = localStorage.getItem('token') // Lấy token sau khi đăng nhập
  
      await axios.post('http://localhost:3000/api/appointments', {
        doctorId: form.value.doctorId,
        date: form.value.date,
        note: form.value.note
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      alert('🟢 Đặt lịch thành công!')
      form.value = { doctorId: '', date: '', note: '' }
    } catch (err) {
      console.error('Lỗi đặt lịch:', err)
      alert('❌ Không thể đặt lịch! ' + (err.response?.data?.message || err.message))
    }
  }
  
  onMounted(() => {
    fetchDoctors()
  })
  </script>
  
  <style scoped>
  .form-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    background-color: #f9f9f9;
  }
  label {
    display: block;
    margin-top: 1rem;
    font-weight: bold;
  }
  input, textarea, select {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.25rem;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
  button {
    margin-top: 1.5rem;
    padding: 0.7rem 1.2rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  button:hover {
    background-color: #388e3c;
  }
  </style>
  