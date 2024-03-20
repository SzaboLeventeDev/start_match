<script setup lang="ts">
import { useFAQStore } from '../stores/useFAQStore'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'

/**
 * Store connected declarations and destructuring
 */
const store = useFAQStore()
const { FAQs } = storeToRefs(store)
const { initFAQs } = store

onBeforeMount(async () => {
  await initFAQs()
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
        data-test-id="faqContainer"
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
