export type Currency = {
  currencyId: number
  name: string
  code: string
  isLogicalDeleted: boolean
}

export type CurrencyToAdd = Omit<Currency, 'currencyId'>
