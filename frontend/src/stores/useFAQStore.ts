import { sendRequest } from '@/core/sendRequest'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFAQtore = defineStore('faq', () => {
  /**
   * states
   */
  const frequentlyAskedQuestions = ref<QuestionAndAnswer[]>([])

  /**
   * getters
   */
  const FAQs = computed(() => frequentlyAskedQuestions.value)
  
  /**
   * actions
   */

  /**
   * @function initQA
   * initialize frequently asked questions array. Get data from the backend
   * @returns {Promise<void>} Not returning any value
   */
  async function initFAQs(): Promise<void> {
    const initValues = await sendRequest("faq")
    console.log(initValues)
    frequentlyAskedQuestions.value = [...initValues]

    console.log({FAQs: FAQs.value})
  }

  return {
    FAQs,
    initFAQs
  }
})
