<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      email: email.value,
      password: password.value,
    })

    const token = res.data.token
    const role = res.data.user.role

    // 🔐 Lưu token và role vào localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)

    // 🔁 Điều hướng theo vai trò
    if (role === 'admin') router.push('/admin/users')
    else if (role === 'doctor') router.push('/doctor/schedule')
    else router.push('/appointments')
  } catch (err) {
    alert('Đăng nhập thất bại!')
  }
}
</script>
