import omitProps from '../../helper/omitProps';
import { CurrencyAttributes } from '../../models/currency';
import { CurrencyToAdd } from '../../types/currency';

export const mockCurrencies: CurrencyAttributes[] = [
  {
    currencyId: 1,
    name: 'Forint',
    code: 'HUF',
    isLogicalDeleted: false,
  },
];

export const mockCurrency = mockCurrencies[0];

export const mockCurrencyToSave: CurrencyToAdd = omitProps(mockCurrency, 'currencyId');
