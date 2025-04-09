import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import BookAppointment from '../pages/BookAppointment.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/book', component: BookAppointment },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
// ✅ Route guard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
  
    const protectedRoutes = {
      '/appointments': ['patient'],
      '/doctor/schedule': ['doctor'],
      '/admin/users': ['admin'],
    }
  
    if (to.path in protectedRoutes) {
      if (!token || !protectedRoutes[to.path].includes(role)) {
        return next('/login')
      }
    }
  
    next()
  })
  const logout = () => {
    localStorage.clear()
    router.push('/login')
  }

export default router


