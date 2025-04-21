<template>
    <header class="header">
      <router-link to="/" class="title-link">Mana Sanctum</router-link>
    </header>
  </template>
  
  <script setup lang="ts">
  // Nada aqui
  </script>
  
  <style scoped>
  .header {
    background-color: #050B3D;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  
  .title-link {
    font-family: 'Jura', sans-serif;
    font-size: 2rem;
    font-weight: 600;
    color: #D9D9D9;
    text-decoration: none;
  }
  
  .title-link:hover {
    text-decoration: underline;
  }
  </style>
  