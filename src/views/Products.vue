<template>
  <div class="products">
    <h2>Products</h2>

    <div class="search-area">
      <input v-model="productSearchTerm" @keydown.enter.prevent type="text" placeholder="Search Product..."
        class="search-input" />

      <button class="search-button" @click.prevent>
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
          <path fill-rule="evenodd"
            d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <button class="add-button" @click="openModal">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
    <table class="products-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Rarity</th>
          <th>Edition</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id" @mouseenter="handleMouseEnter(product)"
          @mouseleave="handleMouseLeave" @mousemove="handleMouseMove"
          :class="{ 'out-of-stock': product.stockQuantity === 0 }">
          <td>{{ product.name }}</td>
          <td>R$ {{ product.price.toFixed(2) }}</td>
          <td>{{ product.stockQuantity }}</td>
          <td>{{ product.rarity }}</td>
          <td>{{ product.edition }}</td>
          <td>
            <button class="edit-button" @click="openEditModal(product)">
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 16.5V19a2 2 0 0 0 2 2h2.5a2 2 0 0 0 1.41-.59l8.1-8.1a2 2 0 0 0 0-2.83l-2.5-2.5a2 2 0 0 0-2.83 0l-8.1 8.1a2 2 0 0 0-.59 1.41Z" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para adicionar cartas -->
    <Modal :show="showModal" :close="closeModal">
      <h2 class="modal-title">Search Card</h2>

      <div class="search-bar">
        <input v-model="searchTerm" type="text" placeholder="Type the card name..." class="modal-search-input"
          @keydown.enter="cardSearch" />
        <button class="search-button" @click="cardSearch">Search</button>
      </div>

      <div class="cards-container">
        <div v-for="card in searchResults" :key="card.id" class="card" @click="selectCard(card)">
          <img :src="card.imageUrl ? card.imageUrl : '/img/back-card.jpg'" alt="Card image" class="card-image"
            @mouseenter="handleMouseEnter(card)" @mouseleave="handleMouseLeave" @mousemove="handleMouseMove" />

          <h3 class="card-title">{{ card.name }}</h3>
          <p class="card-info">Rarity: {{ card.rarity }}</p>
          <p class="card-info">Edition: {{ card.setName }}</p>
          <p class="card-info">Power/Toughness: {{ card.power }}/{{ card.toughness }}</p>


          <!-- Overlay se o card for o selecionado -->
          <div v-if="selectedCard === card" class="overlay">
            <input type="number" v-model="quantity" placeholder="Quantidade" class="overlay-input" />
            <input type="text" v-model="formattedPrice" placeholder="Preço" class="overlay-input"
              @input="formatPrice" />
            <button @click.stop="confirmProduct" class="overlay-button">Confirmar</button>
            <button @click.stop="cancelSelection" class="overlay-button">Cancelar</button>
          </div>
        </div>
      </div>

      <!-- Overlay de zoom no card -->
      <div v-if="hoveredCard" class="card-zoom" :style="zoomStyle">
        <img :src="hoveredCard.imageUrl ? hoveredCard.imageUrl : '/img/back-card.jpg'" alt="Zoomed card"
          class="zoomed-image" />
      </div>

    </Modal>

    <!-- modal de edição -->
    <modal :show="showEditModal" :close="closeEditModal">
      <h2 class="edit-modal-title">{{ editedProduct?.name }}</h2>
      <div class="edit-modal-content">
        <div class="edit-modal-left">
          <img :src="editedProduct?.imageUrl || '/img/back-card.jpg'" alt="Card image" class="edit-modal-image" />
        </div>
        <div class="edit-modal-right">
          <label>Nome: <input v-model="editedProduct.name" class="edit-input" /></label>
          <label>Preço: <input v-model.number="editedProduct.price" class="edit-input" /></label>
          <label>Estoque: <input v-model.number="editedProduct.stockQuantity" class="edit-input" /></label>
          <label>Raridade: <input v-model="editedProduct.rarity" class="edit-input" /></label>
          <label>Edição: <input v-model="editedProduct.edition" class="edit-input" /></label>
          <div class="edit-modal-buttons">
            <button @click="closeEditModal" class="overlay-button">Cancelar</button>
            <button @click="saveEditedProduct" class="overlay-button">Salvar</button>
          </div>
        </div>
      </div>
    </modal>

    <!-- Overlay de zoom no card na lista-->
    <div v-if="hoveredCard" class="card-zoom" :style="zoomStyle">
      <img :src="hoveredCard.imageUrl ? hoveredCard.imageUrl : '/img/back-card.jpg'" alt="Zoomed card"
        class="zoomed-image" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Modal from '@/components/Modal.vue';
import { searchCards } from '@/services/senseiService';
import { saveProduct, getProducts, updateProduct } from '@/services'
import '@/styles/products.css';

//Controle de filtro de busca na pagina
const productSearchTerm = ref('');

//Controle do loading da imagem
const imageLoading = ref<{ [key: string]: boolean }>({});

//inicializa o array de produtos
const products = ref<any[]>([]);

//Controle do modal
const showModal = ref(false);

//Controle do modal de edição
const showEditModal = ref(false);
const editedProduct = ref<any | null>(null);

//Controle da busca das cartas
const searchTerm = ref('');
const searchResults = ref<any[]>([]);

//Controle das informações que precisam ser populadas pelo user
const selectedCard = ref<any | null>(null);
const quantity = ref<number>(0);
const price = ref<number>(0);
const isOverlayOpen = ref(false);

//Controle para formatação do preço
const formattedPrice = ref<string>('');

//Controle da imagem com zoom
const hoveredCard = ref<any | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);

//função para modal de adição
const openModal = () => {
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
  hoveredCard.value = null;
  searchTerm.value = '';
  searchResults.value = [];
  selectedCard.value = null;
  quantity.value = 0;
  price.value = 0;
};
//função para modal de edição
const openEditModal = (product: any) => {
  editedProduct.value = { ...product }; // Cria uma cópia do produto para edição
  showEditModal.value = true;
};
const closeEditModal = () => {
  showEditModal.value = false;
  editedProduct.value = null;
};
const saveEditedProduct = async () => {
  if (!editedProduct.value || !editedProduct.value.id) return;

  try {
    const payload = {
      ...editedProduct.value,
      price: parseFloat(editedProduct.value.price) || 0,
      stockQuantity: editedProduct.value.stockQuantity || 0
    };

    await updateProduct(editedProduct.value.id, payload);
    closeEditModal();
    fetchProducts();
  } catch (error) {
    console.error('Error saving product:', error);
    alert('Failed to save product. Please try again.');
  }
};
//buscar cartas na aplicação "sensei's divine top"
const cardSearch = async () => {
  if (!searchTerm.value) return;

  try {
    const response = await searchCards(searchTerm.value);
    const cards = response.cards;

    if (!cards || cards.length === 0) {
      alert('No cards found.');
      searchResults.value = [];
    } else {
      searchResults.value = cards;
    }
  } catch (error) {
    console.error('Error fetching cards:', error);
    alert('An error ocurred while triying to fetch cards, please try again.');
  }
};
//Ativa clique na carta
const selectCard = (card: any) => {
  selectedCard.value = card;
  quantity.value = 1;
  price.value = 0;
  isOverlayOpen.value = true;
}
const cancelSelection = () => {
  selectedCard.value = null;
  quantity.value = 1;
  price.value = 0;
  isOverlayOpen.value = false;
}
const handleMouseEnter = (card: any) => {
  if (!isOverlayOpen.value) {
    hoveredCard.value = card;
    if (card.id && !(card.id in imageLoading.value)) {
      imageLoading.value[card.id] = true;
    }
  }
};
const handleMouseMove = (event: MouseEvent) => {
  if (!isOverlayOpen.value) {
    mouseX.value = event.clientX;
    mouseY.value = event.clientY;
  }

};
const handleMouseLeave = () => {
  hoveredCard.value = null;
};
const zoomStyle = computed(() => {
  const offsetX = 150;
  const safeMargin = 200; // margem de segurança do topo

  let top = mouseY.value - 210;
  let left = mouseX.value + offsetX;

  // Se o topo calculado for muito acima da tela (negativo ou muito pequeno), força a imagem a descer
  if (top < safeMargin) {
    top = safeMargin; // segura a imagem no safeMargin
  }

  return {
    top: `${top}px`,
    left: `${left}px`
  };
});
//formata o preço no input de price
const formatPrice = () => {
  formattedPrice.value = formattedPrice.value
    .replace(/[^\d.,]/g, '')  //numero, virgula e ponto
    .replace(',', '.');       //troca virgula por ponto

  //Tentar manter apenas um ponto decimal
  const parts = formattedPrice.value.split('.');
  if (parts.length > 2) {
    formattedPrice.value = parts[0] + '.' + parts[1];
  }
}
//Carregar produtos ao iniciar a página
const fetchProducts = async () => {
  try {
    const response = await getProducts();
    products.value = response;
  } catch (error) {
    console.error('Error fetching products:', error);
    alert('An error occurred while fetching products. Please try again.');
  }
};
//Enviar info do produto para the library of alexandria
const confirmProduct = async () => {
  if (!selectedCard.value) return;

  try {
    const payload = {
      name: selectedCard.value.name,
      description: selectedCard.value.text || selectedCard.value.type || 'No description available.',
      imageUrl: selectedCard.value.imageUrl || '',
      price: parseFloat(formattedPrice.value) || 0,
      stockQuantity: quantity.value,
      edition: selectedCard.value.setName || '',
      rarity: selectedCard.value.rarity || ''
    };

    await saveProduct(payload);
    selectedCard.value = null;
    isOverlayOpen.value = false;
    closeModal();
    fetchProducts();
  } catch (error) {
    console.error('Error saving product:', error);
    alert('Failed to save product. Please try again.');
  }
}
//Filtra os produtos com base no termo de busca
const filteredProducts = computed(() => {
  if (!productSearchTerm.value) return products.value;
  return products.value.filter(product =>
    product.name.toLowerCase().includes(productSearchTerm.value.toLowerCase())
  );
});
onMounted(() => {
  fetchProducts();
});
</script>
