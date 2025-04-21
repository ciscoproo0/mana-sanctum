<template>
    <div v-if="show" class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <slot></slot> <!-- Aqui entra o conteúdo dinâmico do modal -->
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    show: boolean
    close: () => void
}>()
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal-content {
    background: #ffffff;
    padding: 2rem;
    border-radius: 1rem;
    width: 70%;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-title {
    text-align: center;
    font-family: 'Jura', sans-serif;
    font-size: 2rem;
    font-weight: 600;
    color: #050B3D;
    margin-bottom: 2rem;
}

.search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    width: 100%;
}

</style>