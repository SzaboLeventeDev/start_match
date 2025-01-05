import { DataTypes } from 'sequelize';
import { db } from '../data/connection';
import { ValidationRules } from '../middleware/validateModel';

export interface CurrencyAttributes {
  currencyId: number;
  name: string;
  code: string;
  isLogicalDeleted: boolean;
}

export const currencyValidationRules: ValidationRules = {
  currencyId: {
    required: true,
    type: 'number',
    minLength: 1,
  },
  name: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 50,
  },
  code: {
    required: true,
    type: 'string',
    regex: new RegExp('^[A-Z]{3}$'),
  },
};

export const newCurrencyValidationRules: ValidationRules = {
  currencyId: {
    required: false,
  },
  name: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 50,
  },
  code: {
    required: true,
    type: 'string',
    regex: new RegExp('^[A-Z]{3}$'),
  },
};

export const Currency = db.define(
  'currency',
  {
    currencyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    isLogicalDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'currencies',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  },
);
