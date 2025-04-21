<template>
    <div class="orders">
      <h2 class="orders-title">Pedidos</h2>
  
      <div class="order-controls">
        <input v-model="searchTerm" type="text" placeholder="Buscar por nome do usuário..." class="order-search-input"
          @keydown.enter="fetchOrders" />
        <button class="search-button" @click="fetchOrders">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
            <path fill-rule="evenodd"
              d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
  
      <table class="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuário</th>
            <th>Status</th>
            <th>Valor Total</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.userId }}</td>
            <td>{{ order.status }}</td>
            <td>R$ {{ order?.totalPrice?.toFixed(2) }}</td>
            <td>{{ formatDate(order?.createdAt || 'ERRO AO RETER DATA') }}</td>
            <td><button class="details-button">Ver Detalhes</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { getOrders } from '@/services/orderService';
  import type { Order } from '@/services/types';
  import '@/styles/orders.css';
  
  const orders = ref<Order[]>([]);
  const searchTerm = ref('');
  
  const fetchOrders = async () => {
    try {
      orders.value = await getOrders();
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      alert('Erro ao buscar pedidos.');
    }
  };
  
  const filteredOrders = computed(() => {
    if (!searchTerm.value.trim()) return orders.value;
    return orders.value.filter(order =>
      String(order.userId).toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };
  
  onMounted(() => {
    fetchOrders();
  });
  </script>