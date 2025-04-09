<template>
    <div class="register-page">
      <h2>Đăng ký tài khoản</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="fullName" placeholder="Họ và tên" required />
        <input v-model="email" placeholder="Email" type="email" required />
        <input v-model="password" placeholder="Mật khẩu" type="password" required />
        <select v-model="role" required>
          <option disabled value="">Chọn vai trò</option>
          <option value="patient">Bệnh nhân</option>
          <option value="doctor">Bác sĩ</option>
        </select>
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const fullName = ref('')
  const email = ref('')
  const password = ref('')
  const role = ref('')
  
  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', {
        fullName: fullName.value,
        email: email.value,
        password: password.value,
        role: role.value,
      })
      alert('Đăng ký thành công! Mời bạn đăng nhập.')
      router.push('/login')
    } catch (err) {
      console.error('❌ Lỗi đăng ký:', err) // 👉 log lỗi rõ ràng
      const message = err.response?.data?.message || 'Lỗi không xác định'
      alert('Đăng ký thất bại: ' + message)
    }
  }
  </script>
  
  <style scoped>
  .register-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
  }
  input, select {
    display: block;
    width: 100%;
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    margin-top: 1rem;
  }
  </style>
  