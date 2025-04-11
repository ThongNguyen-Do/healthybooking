<template>
  <div class="login-page">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" placeholder="Email" type="email" required />
      <input v-model="password" placeholder="Mật khẩu" type="password" required />
      <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
      <button type="submit">Đăng nhập</button>
    </form>
    <p class="register-link">
      Chưa có tài khoản?
      <router-link to="/register">Đăng ký</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '@/components/utils/axios' 

import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    errorMessage.value = ''

    const res = await axios.post('http://localhost:3000/api/auth/login', {
      email: email.value,
      password: password.value
    }, {
      withCredentials: true
    })

    const { token, role } = res.data

    localStorage.setItem('token', token)
    localStorage.setItem('role', role)

    alert('Đăng nhập thành công!')

    
    switch (role) {
      case 'patient':
        router.push('/book')
        break
      case 'doctor':
        router.push('/doctor/schedule')
        break
      case 'admin':
      router.push('/admin/dashboard')
        break
      default:
        router.push('/')
    }

  } catch (err) {
    console.error('❌ Lỗi đăng nhập:', err)
    errorMessage.value = err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
  }
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
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
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
.error {
  color: red;
  margin-top: 0.5rem;
}
.register-link {
  margin-top: 1rem;
  text-align: center;
}
</style>
