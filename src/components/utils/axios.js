// src/components/utils/axios.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // nếu bạn dùng cookie thì bật cái này
})

// ✅ THÊM INTERCEPTOR TỰ ĐỘNG GẮN TOKEN
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
