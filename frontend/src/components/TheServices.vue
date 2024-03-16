<script setup lang="ts">
import { ref } from 'vue';
import BaseTile from './ui/BaseTile.vue';

const services = ref(['Startup Funding', 'Business Incubation', 'Scalable Solutions', 'Investment Opportunities'])
</script>
<template>
  <VContainer id="services" class="services">
    <BaseTile v-for="service in services">
      <template #text class="serviceColor">
        {{ service }}
      </template>
    </BaseTile>
  </VContainer>
</template>
<style scoped>
.services {
  max-width: 800px;
  height: auto;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  overflow-x: auto;
}
.serviceColor {
  color: #1f325f;
}
</style>