<template>
  <div class="dashboard">
    <div class="cards">
      <router-link to="/products" class="card">
        📦 Produtos
      </router-link>
      <router-link to="/users" class="card">
        👤 Usuários
      </router-link>
      <router-link to="/orders" class="card">
        📋 Pedidos
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Nada aqui por enquanto
</script>

<style scoped>
.dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  /* Tamanho da tela menos o header */
}

.cards {
  display: flex;
  gap: 2rem;
}

.card {
  background-color: #050B3D;
  color: #D9D9D9;
  padding: 3rem;
  border-radius: 1rem;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s;
  text-align: center;

}

.card:hover {
  background-color: #3949AB;
}
</style>