<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeaderVue from './components/layout/TheHeader.vue'
</script>

<template>
  <VApp>
    <TheHeaderVue />
    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>
<style scoped></style>
