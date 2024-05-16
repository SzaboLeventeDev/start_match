<script setup lang="ts"></script>
<template>
  <VForm>
    <VContainer class="title">

      <slot name="title" />
    </VContainer>
    <VContainer class="formContent">
      <slot name="content" />
    </VContainer>
    <template class="buttonWrapper">

      <slot name="actions" />
    </template>
  </VForm>
</template>
<style scoped>
.title {
  text-align: center;
  color: var(--c-text);
}

form {
  max-width: 800px;
  margin: auto;
  border: 1px solid var(--c-orange);
  border-radius: 1rem;
  padding: 2rem;
  background-color: var(--c-light-blue)
}

form .formContent {
  color: var(--c-text)
}

.buttonWrapper {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  gap: 1rem;
}

@media(min-width: 425px) {
  .buttonWrapper {
    flex-direction: row;
  }
}
</style>