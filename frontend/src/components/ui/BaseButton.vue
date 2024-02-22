<script setup lang="ts">
defineProps({
  rounded: Boolean,
})
</script>
<template>
  <VBtn class="button" :class="{'rounded-button': rounded}">
    <slot name="icon"></slot>
    <slot class="btn-text" ></slot>
  </VBtn>
</template>
<style scoped>
.button {
  width: 9rem;
  height: 2rem;
  background-color: transparent;
  color: var(--c-dark-grey);
  border: none;
  box-shadow: none;
}

.button:hover {
  color: var(--c-orange);
  border-bottom: 1px solid var(--c-white);
  box-shadow: 0.1rem 2px 0 0 0 var(--c-light-grey);
}

.rounded-button {
  width: 4rem !important; 
  height: 4rem !important;
  border-radius: 50%;
  background-color: var(--c-light-grey);
}
</style>
