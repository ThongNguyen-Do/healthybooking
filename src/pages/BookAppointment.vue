<template>
    <div>
      <h2>🗓 Đặt lịch khám</h2>
      <AppointmentForm />
    </div>
  </template>
  
  <script setup>
  import AppointmentForm from '@/components/booking/AppointmentForm.vue'
  </script>
  
  <style scoped>
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #4caf50;
  }
  </style>
  