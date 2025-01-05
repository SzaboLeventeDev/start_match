import type { Currency, CurrencyToAdd } from './currency'
import type { Ref } from 'vue'

export interface CurrencyStore {
  currencies: Ref<Currency[]>
  currencyToSave: Ref<CurrencyToAdd | null>
  loadCurrencies: () => Promise<void>
  updateCurrency: (item: Currency) => Promise<void>
  addCurrency: () => void
  saveNewCurrency: () => Promise<void>
  cancelNewCurrency: () => void
}
