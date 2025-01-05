import { CurrencyAttributes } from '../models/currency';

export type CurrencyToAdd = Omit<CurrencyAttributes, 'currencyId'>;
