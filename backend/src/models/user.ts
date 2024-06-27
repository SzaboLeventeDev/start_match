import { DataTypes } from 'sequelize';
import { db } from '../data/connection';
import { ValidationRules } from '../middleware/validateModel';

export interface UserAttributes {
  userId: number
  firstName: string
  lastName: string
  dateOfBirth: Date
  email: string
  password: string
  isLogicalDeleted: boolean
}

export const UserPersonalDataValidationRules: ValidationRules = {
  firstName: {
    required: true,
    type: 'string',
  },
  lastName: {
    required: true,
    type: 'string',
  },
  dateOfBirth: {
    required: true,
    type: 'string',
    validator: (value: string) => !Number.isNaN(Date.parse(value)),
  },
  email: {
    required: true,
    type: 'string',
  },
  password: {
    required: true,
    type: 'string',
    regex: /^[a-zA-Z0-9_&@#-]{8,20}$/,
  },
};

export const LoginUserValidationRules: ValidationRules = {
  email: {
    required: true,
    type: 'string',
  },
  password: {
    required: true,
    type: 'string',
    regex: /^[a-zA-Z0-9_&@#-]{8,20}$/,
  },
};

export const User = db.define(
  'user',
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isLogicalDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: 'users',
  },
);
