<template>
  <div class="register-form">
    <h2>Đăng ký tài khoản</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="fullName" type="text" placeholder="Họ tên" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mật khẩu" required />
      
      <select v-model="role" required>
        <option value="">Chọn vai trò</option>
        <option value="patient">Bệnh nhân</option>
        <option value="doctor">Bác sĩ</option>
      </select>
      
      <button type="submit">Đăng ký</button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '@/utils/axios' // Giả sử bạn đã cấu hình sẵn axios

const fullName = ref('')
const email = ref('')
const password = ref('')
const role = ref('')
const error = ref('')

const handleRegister = async () => {
  try {
    await axios.post('/auth/register', {
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      role: role.value
    })
    alert('Đăng ký thành công!')
    // Optional: chuyển qua trang đăng nhập
    // window.location.href = '/login'
  } catch (err) {
    console.error(err)
    const msg = err.response?.data?.message || 'Lỗi không xác định'
    error.value = msg
    alert('Đăng ký thất bại: ' + msg)
  }
}
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.register-form input,
.register-form select {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
}
.register-form button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
