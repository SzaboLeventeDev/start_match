import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { useCurrencyStore } from './useCurrencyStore'

export const useMasterDataStore = defineStore('masterData', () => {
  let currencyStore = ref<ReturnType<typeof useCurrencyStore> | null>(null)

  const getAndInitCurrencyStore = async (): Promise<void> => {
    if (!currencyStore.value) {
      const { useCurrencyStore } = await import('./useCurrencyStore')
      const store = useCurrencyStore()
      await store.loadCurrencies()
      currencyStore.value = store
    }
  }

  return {
    currencyStore,
    getAndInitCurrencyStore
  }
})
