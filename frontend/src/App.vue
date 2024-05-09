<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeaderVue from './components/layout/TheHeader.vue'
</script>

<template>
  <VApp>
    <TheHeaderVue />
    <VMain class="main">
      <RouterView />
    </VMain>
  </VApp>
</template>
<style scoped>
.main {
  background-color: var(--c-baground-dark);
}
</style>
