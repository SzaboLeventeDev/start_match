<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  goalPrice: number,
  actualPrice: number,
  currencyCode?: string,
  showInPercentage: boolean
}>();

const percentage = computed(() => `${((props.actualPrice / props.goalPrice) * 100).toFixed(0)}%`)
const prices = `${props.actualPrice} / ${props.goalPrice} ${props.currencyCode ?? ''}`
</script>
<template>
  <v-container class="status-bar">
    <div class="progress" :style="{ width: percentage }"></div>
    <v-label v-if="showInPercentage" class="percentage">{{ percentage }}</v-label>
    <v-label v-else>{{ prices }}</v-label>
  </v-container>
</template>

<style scoped lang="css">
.status-bar {
  margin: 1rem 0;
  height: 1rem;
  width: 100%;
  border: 1px solid white;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.progress {
  background-color: green;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: width .3s ease-in;
}

.percentage {
  color: white
}
</style>