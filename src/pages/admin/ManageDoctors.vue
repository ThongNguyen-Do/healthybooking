<template>
    <div>
      <h2>👨‍⚕️ Danh sách bác sĩ</h2>
      <form @submit.prevent="addDoctor">
        <input v-model="email" placeholder="Email" required />
        <input v-model="password" placeholder="Mật khẩu" type="password" required />
        <input v-model="fullName" placeholder="Họ tên" required />
        <button type="submit">Thêm bác sĩ</button>
      </form>
  
      <ul>
        <li v-for="doctor in doctors" :key="doctor._id">
          {{ doctor.fullName }} - {{ doctor.email }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from '../../components/utils/axios' 

  
  const email = ref('')
  const password = ref('')
  const fullName = ref('')
  const doctors = ref([])
  
  const getDoctors = async () => {
    const res = await axios.get('/admin/doctors')
    doctors.value = res.data
  }
  
  const addDoctor = async () => {
    try {
      await axios.post('/admin/doctors', {
        email: email.value,
        password: password.value,
        fullName: fullName.value,
      })
      alert('✅ Thêm bác sĩ thành công')
      getDoctors()
      email.value = ''
      password.value = ''
      fullName.value = ''
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi khi thêm bác sĩ')
    }
  }
  
  onMounted(() => getDoctors())
  </script>
  