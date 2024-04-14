import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export interface ValidationRule {
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'object' | 'datestring';
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
  validator?: (value: any) => boolean;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

const validateModel = (model: any, validationRules: ValidationRules) => (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;

  for (const [key, rules] of Object.entries(validationRules)) {
    if (rules.required && data[key] === undefined) {
      return res.status(400).json({ message: `Missing ${key}` });
    }

    if (data[key] !== undefined) {
      

      if (
        rules.type === "object" &&
        rules.validator &&
        !rules.validator(data[key])
      ) {
        // Egyedi validátor függvényt használunk az object típusú mezőkre
        return res.status(400).json({ message: `Invalid ${key}` });
      }

      // Egy külön ellenőrzés a Date objektumok vagy dátumot tartalmazó stringek számára.
      if (rules.type === "object" && key === "dateOfBirth") {
        if (!(typeof data[key] === "string" && !isNaN(Date.parse(data[key])))) {
          return res
            .status(400)
            .json({ message: `Invalid date format for ${key}` });
        }
      }

      // String specific validations
      if (rules.type === "string") {
        if (
          rules.minLength !== undefined &&
          data[key].length < rules.minLength
        ) {
          return res
            .status(400)
            .json({
              message: `${key} is shorter than the minimum allowed length (${rules.minLength})`,
            });
        }

        if (
          rules.maxLength !== undefined &&
          data[key].length > rules.maxLength
        ) {
          return res
            .status(400)
            .json({
              message: `${key} is longer than the maximum allowed length (${rules.maxLength})`,
            });
        }

        if (rules.regex && !rules.regex.test(data[key])) {
          return res
            .status(400)
            .json({ message: `${key} does not match the required pattern` });
        }
      }

      if (rules.validator && !rules.validator(data[key])) {
        return res.status(400).json({ message: `Invalid ${key}` });
      }

      if (rules.type && typeof data[key] !== rules.type) {
        return res.status(400).json({ message: `Invalid type for ${key}` });
      }
    }
  }

  next();
};

export default validateModel;
