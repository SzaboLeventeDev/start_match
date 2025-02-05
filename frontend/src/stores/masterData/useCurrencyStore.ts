import { sendRequest } from '@/core/sendRequest'
import type { Currency, CurrencyToAdd } from '@/interfaces/currency'
import type { CurrencyStore } from '@/interfaces/stores'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthorizationStore } from '../useAuthorizationStore'

export const useCurrencyStore = defineStore('currency', (): CurrencyStore => {
  const currencies = ref<Currency[]>([])
  const baseUrl = 'master-data/currency'
  const currencyToSave = ref<CurrencyToAdd | null>(null)

  const loadCurrencies = async (): Promise<void> => {
    currencies.value = await sendRequest(`${baseUrl}/all`, 'GET', undefined, undefined, true)
  }

  const updateCurrency = async (item: Currency): Promise<void> => {
    const authStore = useAuthorizationStore()
    if (!authStore.isAdmin) {
      throw new Error('Unauthorized: Admin access required to update currency!')
    }

    const { currency, error } = await sendRequest(
      `${baseUrl}/update/${item.currencyId}`,
      'PUT',
      item,
      undefined,
      true
    )

    if (currency) {
      const indexOfCurrency = currencies.value.findIndex(
        (currency) => currency.currencyId === currency.currencyId
      )

      if (indexOfCurrency !== -1) {
        currencies.value[indexOfCurrency] = currency
      }
    }
  }

  const addCurrency = (): void => {
    const authStore = useAuthorizationStore()
    if (!authStore.isAdmin) {
      throw new Error('Unauthorized: Admin access required to create new currency!')
    }

    currencyToSave.value = {
      name: '',
      code: '',
      isLogicalDeleted: false
    }
  }

  const saveNewCurrency = async (): Promise<void> => {
    const authStore = useAuthorizationStore()
    if (!authStore.isAdmin) {
      throw new Error('Unauthorized: Admin access required to save the created currency!')
    }

    if (currencyToSave.value !== null) {
      const { currency } = await sendRequest(
        `${baseUrl}/add`,
        'POST',
        currencyToSave.value,
        undefined,
        true
      )

      if (currency) {
        currencies.value.push(currency)
        currencyToSave.value = null
      }
    }
  }

  const cancelNewCurrency = (): void => {
    currencyToSave.value = null
  }

  return {
    currencies,
    currencyToSave,
    loadCurrencies,
    updateCurrency,
    addCurrency,
    saveNewCurrency,
    cancelNewCurrency
  }
})
