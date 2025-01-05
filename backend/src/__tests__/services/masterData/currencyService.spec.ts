import { mockCurrencies, mockCurrency, mockCurrencyToSave } from '../../../__mocks__/masterData/mockCurrency';
import { sequelizeToResponseArrayHelper, sequelizeToResponseHelper } from '../../../helper/sequelizeToResponseHelper';
import { Currency, CurrencyAttributes } from '../../../models/currency';
import { addCurrency, deleteCurrency, getCurrencies, updatecurrency } from '../../../services/masterData/currencyService';

jest.mock('../../../models/currency', () => ({
  Currency: {
    create: jest.fn().mockResolvedValue({
      get: jest.fn<CurrencyAttributes, []>(() => mockCurrency),
    }),
    findAll: jest.fn().mockResolvedValue(mockCurrencies),
    update: jest.fn().mockResolvedValue([1]),
    findOne: jest.fn().mockResolvedValue(mockCurrency),
  },
}));

jest.mock('../../../helper/sequelizeToResponseHelper', () => ({
  _esModule: true,
  sequelizeToResponseArrayHelper: jest.fn(),
  sequelizeToResponseHelper: jest.fn(),
}));

describe('Test cases of currency service', () => {
  test('The service gives back all of the currencies successfully.', async () => {
    (Currency.findAll as jest.Mock).mockResolvedValue(mockCurrencies);
    (sequelizeToResponseArrayHelper as jest.Mock).mockReturnValue(mockCurrencies);
    const result = await getCurrencies();

    const length = result.length;
    expect(length).toBe(1);
  });
  test('The service updates the currency successfully.', async () => {
    (sequelizeToResponseHelper as jest.Mock).mockResolvedValue(mockCurrency);
    const result = await updatecurrency(mockCurrency);
    expect(result).toEqual(mockCurrency);
  });
  test('The service deletes the currency successfully.', async () => {
    await deleteCurrency(mockCurrency.currencyId);
    expect(Currency.update).toHaveBeenCalledWith({ isLogicalDeleted: true }, { where: { currencyId: mockCurrency.currencyId } });
  });
  test('The service adds a new currency successfully.', async () => {
    const result = await addCurrency(mockCurrencyToSave);
    expect(result).toEqual(mockCurrency);
  });
});
