<script setup lang="ts"></script>
<template>
  <VContainer class="tile">
    <VCardText class="text">
      <slot name="text"></slot>
    </VCardText>
    <slot></slot>
  </VContainer>
</template>
<style scoped>
.tile {
  width: 8rem;
  height: 8rem;
  background-color: #1f325f;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;


  @media (min-width: 1024px) {
    width: 12rem;
    height: 12rem;
  }
}
.text {
  padding: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

</style>