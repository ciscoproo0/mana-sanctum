<template>
  <div class="users">
    <h2>Usuários</h2>

    <div class="search-area">
      <input v-model="searchTerm" type="text" placeholder="Buscar usuário..." class="search-input"
        @keydown.enter="fetchUsers" />
      <button class="search-button" @click="fetchUsers">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
          <path fill-rule="evenodd"
            d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <button class="add-user-button" @click="openModal">Adicionar Usuário</button>
    </div>

    <table class="users-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Função</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>

    <Modal :show="showModal" :close="closeModal">
      <h2 class="modal-title">Adicionar Novo Usuário</h2>
      <div class="modal-content">
        <input v-model="newUser.username" type="text" placeholder="Nome" class="modal-input" />
        <input v-model="newUser.email" type="email" placeholder="Email" class="modal-input" />
        <input v-model="newUser.passwordHash" type="password" placeholder="Senha" class="modal-input" />
        <select v-model="newUser.role" class="modal-input">
          <option value="Admin">Admin</option>
          <option value="Customer">Customer</option>
        </select>
        <div class="modal-buttons">
          <button class="overlay-button" @click="createNewUser">Salvar</button>
          <button class="overlay-cancel-button" @click="closeModal">Cancelar</button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Modal from '@/components/Modal.vue';
import { getUsers, createUser } from '@/services';
import '@/styles/users.css';

const showModal = ref(false);
const searchTerm = ref('');
const users = ref<any[]>([]);

const newUser = ref({
  username: '',
  email: '',
  passwordHash: '',
  role: 'Customer'
});

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  newUser.value = { username: '', email: '', passwordHash: '', role: 'Customer' };
};

const fetchUsers = async () => {
  try {
    const response = await getUsers();
    users.value = response;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    alert('Erro ao buscar usuários.');
  }
};

const filteredUsers = computed(() => {
  if (!searchTerm.value.trim()) return users.value;
  return users.value.filter(user => user.username.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

const createNewUser = async () => {
  try {
    const payload = {
      username: newUser.value.username,
      email: newUser.value.email,
      passwordHash: newUser.value.passwordHash,
      role: newUser.value.role as "Admin" | "Customer"
    };

    await createUser(payload);
    closeModal();
    fetchUsers();
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    alert('Erro ao criar usuário. Verifique os dados e tente novamente.');
  }
};

onMounted(() => {
  fetchUsers();
});
</script>