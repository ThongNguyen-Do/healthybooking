<template>
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero">
        <h2>Chào mừng đến với hệ thống đặt lịch khám bệnh</h2>
        <p>Đặt lịch nhanh chóng, chính xác, tiện lợi mọi lúc mọi nơi.</p>
        <router-link to="/book">
          <button class="book-btn">Đặt lịch ngay</button>
        </router-link>
      </section>
    </div>
  </template>
  
  <script setup>
  // Không cần script logic ở đây
  </script>
  
  <style scoped>
  .home-container {
    font-family: 'Segoe UI', sans-serif;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #4caf50;
    color: white;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    margin-left: 1rem;
  }
  
  .nav-link:hover {
    text-decoration: underline;
  }
  
  .hero {
    text-align: center;
    padding: 4rem 2rem;
    background-color: #f9f9f9;
  }
  
  .hero h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .hero p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  
  .book-btn {
    background-color: #4caf50;
    color: white;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .book-btn:hover {
    background-color: #43a047;
  }
  </style>
  