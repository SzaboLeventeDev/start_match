import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { useCurrencyStore } from './useCurrencyStore'
import { useProjectCategoryStore } from './useProjectCategoryStore'
import type { MasterDataStore } from '@/interfaces/stores'

export const useMasterDataStore = defineStore('masterData', (): MasterDataStore => {
  let currencyStore = ref<ReturnType<typeof useCurrencyStore> | null>(null)
  let projectCategoryStore = ref<ReturnType<typeof useProjectCategoryStore> | null>(null)

  const getAndInitCurrencyStore = async (): Promise<void> => {
    if (!currencyStore.value) {
      const { useCurrencyStore } = await import('./useCurrencyStore')
      const store = useCurrencyStore()
      await store.loadCurrencies()
      currencyStore.value = store
    }
  }

  const getAndInitProjectCategoryStore = async (): Promise<void> => {
    if (!projectCategoryStore.value) {
      const { useProjectCategoryStore } = await import('./useProjectCategoryStore')
      const store = useProjectCategoryStore()
      await store.loadProjectCategories()
      projectCategoryStore.value = store
    }
  }
  return {
    currencyStore,
    projectCategoryStore,
    getAndInitCurrencyStore,
    getAndInitProjectCategoryStore
  }
})
