<template>
    <div class="login-page">
      <h2>Đăng nhập</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" placeholder="Email" type="email" required />
        <input v-model="password" placeholder="Mật khẩu" type="password" required />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  
  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email: email.value,
        password: password.value
      })
  
      // ✅ Lưu token và thông tin người dùng nếu cần
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
  
      alert('Đăng nhập thành công!')
      router.push('/book') // chuyển hướng tới đặt lịch
    } catch (err) {
      alert('Đăng nhập thất bại: ' + err.response?.data?.message || 'Lỗi không xác định')
    }
  }
  </script>
  
  <style scoped>
  .login-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
  }
  input {
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
  