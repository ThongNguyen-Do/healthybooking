<template>
    <div>
      <h2>📋 Danh sách bệnh nhân</h2>
      <ul>
        <li v-for="user in patients" :key="user._id">
          {{ user.fullName }} - {{ user.email }} - {{ user.status }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from '../../components/utils/axios' 

  
  const patients = ref([])
  
  const fetchPatients = async () => {
    const res = await axios.get('/admin/patients')
    patients.value = res.data
  }
  
  onMounted(fetchPatients)
  </script>
  