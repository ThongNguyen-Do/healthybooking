import { createRouter, createWebHistory } from 'vue-router'

// Import các trang
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import BookAppointment from '../pages/BookAppointment.vue'
import ManageUsers from '../pages/admin/ManageUsers.vue'
import ManageDoctors from '../pages/admin/ManageDoctors.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/book', component: BookAppointment },
  { path: '/admin/users', component: ManageUsers },
  { path: '/admin/doctors', component: ManageDoctors }
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
    '/appointments': ['patient'],
    '/doctor/schedule': ['doctor'],
    '/admin/users': ['admin'],
    '/admin/doctors': ['admin'],
  }

  if (to.path in protectedRoutes) {
    if (!token || !protectedRoutes[to.path].includes(role)) {
      return next('/login')
    }
  }

  next()
})

// ✅ Hàm logout tiện dụng nếu cần dùng
export const logout = () => {
  localStorage.clear()
  router.push('/login')
}

export default router
