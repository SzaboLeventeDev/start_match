<template>
  <VBtn class="button">
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
</style>