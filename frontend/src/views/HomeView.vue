<script setup lang="ts">
import TheHero from '@/components/TheHero.vue'
import TheIntroduction from '@/components/TheIntroduction.vue'
import TheServices from '@/components/TheServices.vue'
import TheContact from '@/components/TheContact.vue'
</script>

<template>
  <VContainer class="page">
    <TheHero />
    <TheIntroduction />
    <TheServices />
    <TheContact />
  </VContainer>
</template>
<style scoped>
.page {
  margin: 0;
  width: 100%;
  background-color: var(--c-light-black);
  color: var(--c-orange);
}

@media (min-width: 960px) {
  .v-container {
    max-width: unset;
    margin: 0;
  }
}
</style>
