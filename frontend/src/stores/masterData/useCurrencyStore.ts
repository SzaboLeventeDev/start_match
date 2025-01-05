import { sendRequest } from '@/core/sendRequest'
import type { Currency, CurrencyToAdd } from '@/interfaces/currency'
import type { CurrencyStore } from '@/interfaces/stores'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCurrencyStore = defineStore('currency', (): CurrencyStore => {
  const currencies = ref<Currency[]>([])
  const baseUrl = 'master-data/currency'
  const currencyToSave = ref<CurrencyToAdd | null>(null)

  const loadCurrencies = async (): Promise<void> => {
    currencies.value = await sendRequest(`${baseUrl}/all`, 'GET', undefined, undefined, true)
  }

  const updateCurrency = async (item: Currency): Promise<void> => {
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
    currencyToSave.value = {
      name: '',
      code: '',
      isLogicalDeleted: false
    }
  }

  const saveNewCurrency = async (): Promise<void> => {
    console.log('save currency', { isCurrency: currencyToSave.value !== null })
    if (currencyToSave.value !== null) {
      const { currency } = await sendRequest(
        `${baseUrl}/add`,
        'POST',
        currencyToSave.value,
        undefined,
        true
      )

      console.log({ currency, currencies, firstCurrency: currencies.value[0] })
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
