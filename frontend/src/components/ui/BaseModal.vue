<script setup lang="ts">
const emit = defineEmits(['closeModal']);
const closeModal = () => {
  emit('closeModal', false)
}
</script>
<template>
  <teleport to="body">
    <v-container class="modal-overlay">
      <base-button mode="flat circle" class="closeButton" @click="closeModal">
        <template #actionIcon>
          <v-icon class="material-icons" icon="mdi-close" />
        </template>
      </base-button>
    </v-container>
    <v-container class="modal">
      <header>
        <v-card-title>

          <slot name="title"></slot>
        </v-card-title>
      </header>
      <v-card-text class="content">
        <slot name="content"></slot>
      </v-card-text>
      <template class="content">
      </template>
        <v-container class="modalActionButtons">
        <slot name="actions"></slot>
      </v-container>
    </v-container>
  </teleport>
</template>
<style scoped>
header {
  display: flex;
  justify-content: center;
  color: var(--c-orange)
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
}

.modal {
  max-width: 70vw;
  max-height: 75vh;
  position: fixed;
  border: 1px solid white;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.closeButton {
  position: fixed;
  right: 3rem;
  top: 3rem;
}

.content {
  color: var(--c-white);
  padding: 0.5rem 0
}
.modalActionButtons {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
}
</style>
