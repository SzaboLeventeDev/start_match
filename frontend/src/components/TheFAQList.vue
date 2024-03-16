<script setup lang="ts">
import { useFAQtore } from '@/stores/useFAQStore'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'

/**
 * Store connected declarations and destructuring
 */
const store = useFAQtore()
const { FAQs } = storeToRefs(store)
const { initFAQs: initQA } = store

onBeforeMount(async () => {
  await initQA()
  console.log('onBefoureMount', { FAQs })
})
</script>
<template>
  <VContainer id="FAQ" v-if="FAQs.length > 0">
    <VExpansionPanels v-if="FAQs" variant="accordion">
      <VExpansionPanel
        v-for="qa in FAQs"
        :key="`qa_${qa.questionId}`"
        :title="qa.question"
        class="panel"
      >
        <template #text>
          <VLabel class="faqAnswer">
            {{ qa.answer }}
          </VLabel>
        </template>
      </VExpansionPanel>
    </VExpansionPanels>
  </VContainer>
</template>
<style scoped>
.panel {
  background-color: #1f325f;
  color: #fca311;
}

.faqAnswer {
  color: white;
  width: 90%;
  margin: auto;
  text-wrap: wrap;
}
</style>
