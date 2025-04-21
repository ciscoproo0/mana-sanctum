<template>
    <div class="orders">
      <h2 class="orders-title">Pedidos</h2>
  
      <div class="order-controls">
        <input v-model="searchTerm" type="text" placeholder="Buscar por status..." class="order-search-input"
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
            <td>
              <button class="details-button" @click="openOrderDetails(order)">Ver Detalhes</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <Modal :show="showDetailsModal" :close="closeDetailsModal">
        <h2 class="modal-title">Detalhes do Pedido #{{ selectedOrder?.id }}</h2>
        <div class="order-details">
          <div><strong>Status:</strong> {{ selectedOrder?.status }}</div>
          <div><strong>Total:</strong> R$ {{ selectedOrder?.totalPrice?.toFixed(2) }}</div>
          <div><strong>Usuário:</strong> {{ selectedOrder?.userId }}</div>
          <div><strong>Data:</strong> {{ formatDate(selectedOrder?.createdAt || '') }}</div>
  
          <div v-if="selectedOrder?.orderItems?.length">
            <h3>Itens:</h3>
            <ul>
              <li v-for="item in selectedOrder.orderItems" :key="item.id">
                Produto ID: {{ item.productId }} — Quantidade: {{ item.quantity }} — Preço: R$ {{ item.price.toFixed(2) }}
              </li>
            </ul>
          </div>
  
          <div v-if="selectedOrder?.shippingInfo">
            <h3>Entrega:</h3>
            <p>{{ selectedOrder.shippingInfo.address }}, {{ selectedOrder.shippingInfo.city }} - {{ selectedOrder.shippingInfo.state }}, {{ selectedOrder.shippingInfo.postalCode }}</p>
            <p><strong>Status Entrega:</strong> {{ selectedOrder.shippingInfo.status }}</p>
          </div>
  
          <div v-if="payment">
            <h3>Pagamento:</h3>
            <p><strong>Método:</strong> {{ payment.method }}</p>
            <p><strong>Status:</strong> {{ payment.status }}</p>
            <p><strong>Valor:</strong> R$ {{ payment.amount.toFixed(2) }}</p>
            <p><strong>Transação:</strong> {{ payment.transactionId }}</p>
            <p><strong>Finalizado em:</strong> {{ payment.completedAt ? formatDate(payment.completedAt) : '—' }}</p>
          </div>
  
          <div class="modal-buttons">
            <button class="save-button" @click="closeDetailsModal">Fechar</button>
          </div>
        </div>
      </Modal>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { getOrders } from '@/services/orderService';
  import { getPaymentById } from '@/services/paymentService';
  import type { Order, Payment } from '@/services/types';
  import Modal from '@/components/Modal.vue';
  import '@/styles/orders.css';
  
  const orders = ref<Order[]>([]);
  const searchTerm = ref('');
  const selectedOrder = ref<Order | null>(null);
  const payment = ref<Payment | null>(null);
  const showDetailsModal = ref(false);
  
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
      order?.status?.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
  
  const openOrderDetails = async (order: Order) => {
    selectedOrder.value = order;
    showDetailsModal.value = true;
  
    try {
      if (order.id !== undefined) {
        const response = await getPaymentById(order.id);
        payment.value = response;
      } else {
        console.warn('Pedido sem ID válido.');
        payment.value = null;
      }
    } catch (err) {
      console.warn('Nenhum pagamento encontrado para este pedido ou erro na requisição.');
      payment.value = null;
    }
  };
  
  const closeDetailsModal = () => {
    selectedOrder.value = null;
    payment.value = null;
    showDetailsModal.value = false;
  };
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };
  
  onMounted(() => {
    fetchOrders();
  });
  </script>
  