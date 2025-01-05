import { sequelizeToResponseArrayHelper, sequelizeToResponseHelper } from '../../helper/sequelizeToResponseHelper';
import { Currency, CurrencyAttributes } from '../../models/currency';
import { CurrencyToAdd } from '../../types/currency';
import logger from '../../logger';

/**
 * @function getCurrencies
 * @description Get the currencies from the database. (master data)
 * @returns {Promise<CurrencyAttributes[]>} Returns the currencies.
 */
export const getCurrencies = async (): Promise<CurrencyAttributes[]> => {
  const records = await Currency.findAll();
  const currencies = sequelizeToResponseArrayHelper<CurrencyAttributes>(records);
  return currencies;
};

export const addCurrency = async (currency: CurrencyToAdd): Promise<CurrencyAttributes> => {
  const newRecord = await Currency.create({ name: currency.name, code: currency.code, isLogicalDeleted: false });
  return newRecord.get({ plain: true });
};

export const updatecurrency = async (currency: CurrencyAttributes): Promise<CurrencyAttributes | null> => {
  const [affectedCount] = await Currency.update(currency, {
    where: {
      currencyId: currency.currencyId,
    },
  });

  if (affectedCount === 0) return null;

  const updatedCurrency = await Currency.findOne({ where: { currencyId: currency.currencyId } });

  if (!updatedCurrency) return null;
  const result = sequelizeToResponseHelper<CurrencyAttributes>(updatedCurrency, ['code', 'name', 'currencyId']);
  return result;
};

export const deleteCurrency = async (currencyId: number): Promise<void> => {
  const currencyRow = await Currency.findOne({ where: { currencyId } });

  if (!currencyRow) {
    logger.error(`Currency with ID ${currencyId} not found`);
  }

  await Currency.update(
    { isLogicalDeleted: true },
    {
      where: { currencyId },
    },
  );
};
