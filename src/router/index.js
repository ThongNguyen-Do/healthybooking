import { createRouter, createWebHistory } from 'vue-router'

// Import các trang
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import BookAppointment from '../pages/BookAppointment.vue'
import AdminDashboard from '../pages/admin/AdminDashboard.vue'
import DoctorDashboard from '../pages/DoctorDashboard.vue'

// Nếu bạn có các trang riêng cho bác sĩ hoặc bệnh nhân, import ở đây

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/book', component: BookAppointment },
  { path: '/admin/dashboard', component: AdminDashboard },
  { path: '/doctor/schedule', component: DoctorDashboard }

  // Có thể thêm các route khác như: /doctor/schedule, /admin/manage-doctors nếu cần
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ Route guard để kiểm tra phân quyền
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  const protectedRoutes = {
    '/book': ['patient'],
    '/doctor/schedule': ['doctor'],
    '/admin/dashboard': ['admin'],
  }

  if (to.path in protectedRoutes) {
    if (!token || !protectedRoutes[to.path].includes(role)) {
      return next('/login')
    }
  }

  next()
})

// ✅ Hàm logout tiện dụng
export const logout = () => {
  localStorage.clear()
  router.push('/login')
}

export default router
