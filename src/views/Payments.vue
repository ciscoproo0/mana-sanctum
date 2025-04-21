<template>
    <div class="payments">
      <h2 class="payments-title">Pagamentos</h2>
  
      <div class="payment-controls">
        <input v-model="searchTerm" type="text" placeholder="Buscar por status..." class="payment-search-input"
          @keydown.enter="fetchPayments" />
        <button class="search-button" @click="fetchPayments">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
            <path fill-rule="evenodd"
              d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
  
      <table class="payments-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pedido</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Método</th>
            <th>Transação</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in filteredPayments" :key="payment.id">
            <td>{{ payment.id }}</td>
            <td>{{ payment.orderId }}</td>
            <td>R$ {{ payment.amount.toFixed(2) }}</td>
            <td>{{ payment.status }}</td>
            <td>{{ payment.method }}</td>
            <td>{{ payment.transactionId }}</td>
            <td>{{ formatDate(payment.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { getPayments } from '@/services/paymentService';
  import type { Payment } from '@/services/types';
  import '@/styles/payments.css';
  
  const payments = ref<Payment[]>([]);
  const searchTerm = ref('');
  
  const fetchPayments = async () => {
    try {
      payments.value = await getPayments();
    } catch (error) {
      console.error('Erro ao buscar pagamentos:', error);
      alert('Erro ao buscar pagamentos.');
    }
  };
  
  const filteredPayments = computed(() => {
    if (!searchTerm.value.trim()) return payments.value;
    return payments.value.filter(payment =>
      payment.status.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };
  
  onMounted(() => {
    fetchPayments();
  });
  </script>
  