<script setup lang="ts">
const heroIntro: string[] = ['test1', 'test2', 'test3']
</script>
<template>
  <VContainer id="hero" class="hero">
    <VLabel v-for="text in heroIntro" class="intro">{{ text }}</VLabel>
  </VContainer>
</template>
<style scoped>
.hero {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: var(--c-light-black);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero .intro {
  font-size: 3rem;
}
@media (min-width: 768px) {
  .v-container {
    max-width: none;
  }
}
</style>
