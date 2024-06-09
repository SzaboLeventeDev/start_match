<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeaderVue from './components/layout/TheHeader.vue'
</script>

<template>
  <v-app>
    <TheHeaderVue />
    <v-main class="main">
      <RouterView/>
    </v-main>
  </v-app>
</template>
<style scoped>
.main {
  background-color: var(--c-baground-dark);
  padding-top: 4rem;
}
.view {
  display: flex;
  flex-grow: 1;
}
</style>
