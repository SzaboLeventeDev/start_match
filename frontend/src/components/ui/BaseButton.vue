<script setup lang="ts">
defineProps({
  rounded: Boolean,
  mode: String,
})
</script>
<template>
  <VBtn class="button" :class="mode">
    <slot name="icon"></slot>
    <slot class="btn-text" ></slot>
  </VBtn>
</template>
<style scoped>
button {
  border-radius: 2rem;
  padding: 1rem;
  border: 0;
  background-color: var(--c-button-background);
  color: var(--c-button-text);
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
}

button:disabled {
  background-color: var(--color-button-disabled);
  color: var(--color-button-disabled-text);
}

.flat {
  background-color: transparent;
  border: 3px solid var(--c-flat-button-border);
}

.circle {
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 768px) {
  .circle {
    width: 4rem;
    height: 4rem;
  }
}
</style>
