import { Request, Response, NextFunction } from "express";

export interface ValidationRule {
  required?: boolean;
  type?: "string" | "number" | "boolean" | "object";
  validator?: (value: any) => boolean;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

const validateModel = (model: any, validationRules: ValidationRules) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    for (const [key, rules] of Object.entries(validationRules)) {
      if (rules.required && data[key] === undefined) {
        return res.status(400).json({ message: `Missing ${key}` });
      }

      if(data[key] !== undefined) {
        if (rules.type && typeof data[key] !== rules.type) {
          return res.status(400).json({ message: `Invalid type for ${key}` });
        }
        
        if (rules.validator && !rules.validator(data[key])) {
          return res.status(400).json({ message: `Invalid ${key}` });
        }
      }
    }

    next();
  };
};

export default validateModel;
