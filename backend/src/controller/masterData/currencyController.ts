import { Request, Response, NextFunction } from 'express';
import { addCurrency, deleteCurrency, getCurrencies, updatecurrency } from '../../services/masterData/currencyService';

interface CurrencyControllerAttributes {
  getCurrencies: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  addCurrency: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  updateCurrency: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  deleteCurrency: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export const currencyController: CurrencyControllerAttributes = {
  async getCurrencies(_: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await getCurrencies();

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  async addCurrency(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await addCurrency(req.body);

      if (!result) {
        res.status(400).json({ message: 'Saving new currency failed!' });
      }

      res.status(201).json({ message: 'Saving new currency is successful!', currency: result });
    } catch (error) {
      next(error);
    }
  },
  async updateCurrency(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await updatecurrency(req.body);

      if (!result) {
        res.status(304).json({ message: 'Currency has not modified!' });
      }

      res.status(200).json({ message: 'Update currency is successful!', currency: result });
    } catch (error) {
      next(error);
    }
  },
  async deleteCurrency(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await deleteCurrency(req.body);
      res.status(200).json({ message: 'Currency deleted successfully!' });
    } catch (error) {
      next(error);
    }
  },
};
