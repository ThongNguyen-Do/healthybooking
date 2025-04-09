<template>
    <div class="admin-dashboard">
      <h2>👨‍⚕️ Danh sách bác sĩ</h2>
  
      <!-- Form thêm bác sĩ mới -->
      <form @submit.prevent="addDoctor" class="form">
        <input v-model="newDoctor.fullName" placeholder="Họ tên" required />
        <input v-model="newDoctor.email" type="email" placeholder="Email" required />
        <input v-model="newDoctor.password" type="password" placeholder="Mật khẩu" required />
        <button type="submit">➕ Thêm bác sĩ</button>
      </form>
  
      <!-- Danh sách bác sĩ -->
      <ul>
        <li v-for="doctor in doctors" :key="doctor._id">
          <template v-if="editingDoctorId === doctor._id">
            <input v-model="editDoctor.fullName" placeholder="Họ tên" />
            <input v-model="editDoctor.email" placeholder="Email" />
            <button @click="updateDoctor(doctor._id)">💾 Lưu</button>
            <button @click="cancelEdit">❌ Huỷ</button>
          </template>
          <template v-else>
            {{ doctor.fullName }} - {{ doctor.email }}
            <button @click="startEdit(doctor)">✏️ Sửa</button>
            <button @click="deleteDoctor(doctor._id)">🗑 Xoá</button>
          </template>
        </li>
      </ul>
  
      <h2>👨‍💼 Danh sách bệnh nhân</h2>
      <ul>
        <li v-for="user in users" :key="user._id">
          {{ user.fullName }} - {{ user.email }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from '../../components/utils/axios'
  
  const doctors = ref([])
  const users = ref([])
  
  const newDoctor = ref({
    fullName: '',
    email: '',
    password: ''
  })
  
  const editDoctor = ref({
    fullName: '',
    email: ''
  })
  const editingDoctorId = ref(null)
  
  const fetchData = async () => {
    try {
      const [doctorRes, patientRes] = await Promise.all([
        axios.get('/admin/doctors'),
        axios.get('/admin/patients'),
      ])
      doctors.value = doctorRes.data
      users.value = patientRes.data
    } catch (err) {
      console.error('❌ Lỗi khi lấy dữ liệu:', err)
    }
  }
  
  const addDoctor = async () => {
    try {
      await axios.post('/admin/doctors', newDoctor.value)
      alert('✅ Thêm bác sĩ thành công!')
      newDoctor.value = { fullName: '', email: '', password: '' }
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || '❌ Thêm thất bại.')
    }
  }
  
  const deleteDoctor = async (id) => {
    if (!confirm('Bạn có chắc muốn xoá bác sĩ này?')) return
    try {
        await axios.delete(`/admin/doctors/${id}`) 
      fetchData()
    } catch (err) {
      alert('❌ Lỗi khi xoá bác sĩ.')
    }
  }
  
  const startEdit = (doctor) => {
    editingDoctorId.value = doctor._id
    editDoctor.value = {
      fullName: doctor.fullName,
      email: doctor.email
    }
  }
  
  const cancelEdit = () => {
    editingDoctorId.value = null
  }
  
  const updateDoctor = async (id) => {
    try {
      await axios.put(`/admin/doctors/${id}`, editDoctor.value)
      editingDoctorId.value = null
      fetchData()
    } catch (err) {
      alert('❌ Lỗi khi cập nhật bác sĩ.')
    }
  }
  
  onMounted(fetchData)
  </script>
  
  <style scoped>
  .admin-dashboard {
    padding: 20px;
  }
  h2 {
    margin-top: 30px;
    color: #2c3e50;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    background: #f2f2f2;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .form input {
    margin: 5px 0;
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  .form button {
    margin-top: 10px;
    padding: 8px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  button {
    margin-left: 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.8;
  }
  </style>
  