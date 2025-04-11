<template>
    <header class="header">
      <h1>HealthyBooking</h1>
      <nav>
        <router-link to="/">Trang chủ</router-link> |
        <router-link to="/login">Đăng nhập</router-link> |
        <router-link to="/register">Đăng ký</router-link>
      </nav>
    </header>
  </template>
  
  <script setup>
  
  </script>
  
  <style scoped>
  .header {
    background-color: #4caf50;
    color: white;
    padding: 1rem;
    text-align: center;
  }
  nav a {
    margin: 0 8px;
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  nav a.router-link-active {
    text-decoration: underline;
  }
  </style>
  