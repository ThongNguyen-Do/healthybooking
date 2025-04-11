<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/components/utils/axios';
import DoctorWriteRecord from './DoctorWriteRecord.vue';


const appointments = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get('/appointment/my');
    appointments.value = res.data;
  } catch (err) {
    console.error('Lỗi khi lấy lịch hẹn:', err);
  }
});
</script>

<template>
  <div class="doctor-dashboard">
    <h1>Lịch hẹn của tôi</h1>

    <ul v-if="appointments.length">
      <li v-for="appt in appointments" :key="appt._id" class="appointment-card">
        👤 <strong>{{ appt.patient.fullName }}</strong> ({{ appt.patient.email }}) <br />
        🕒 <strong>Thời gian:</strong> {{ new Date(appt.date).toLocaleString() }} <br />
        📋 <strong>Ghi chú:</strong> {{ appt.note || 'Không có' }} <br />

        <DoctorWriteRecord
          :appointmentId="appt._id"
          :doctorId="appt.doctor" 
          :patientId="appt.patient._id"
        />
      </li>
    </ul>

    <p v-else>Không có lịch hẹn nào.</p>
  </div>
</template>

<style scoped>
.doctor-dashboard {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
.appointment-card {
  background: #f4f4f4;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 10px;
}
</style>
