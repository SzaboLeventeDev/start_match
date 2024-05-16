<script setup lang="ts">
const emit = defineEmits(['closeModal'])
const closeModal = () => {
  emit('closeModal', false)
}
</script>
<template>
  <teleport to="body">
    <VContainer class="modal-overlay">
      <BaseButton mode="flat circle" class="closeButton" @click="closeModal">
        <template #actionIcon>
          <VIcon class="material-icons" icon="close" />
        </template>
      </BaseButton>
    </VContainer>
    <VContainer class="modal">
      <header>
        <slot name="title"></slot>
      </header>
      <template class="content">
        <slot name="content"></slot>
      </template>
        <VContainer class="modalActionButtons">
        <slot name="actions"></slot>
      </VContainer>
    </VContainer>
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
  border-radius: 2rem;
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
  color: var(--c-orange);
}
.modalActionButtons {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
