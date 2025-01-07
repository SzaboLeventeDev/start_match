import { DataTypes } from 'sequelize';
import { db } from '../data/connection';
import { ValidationRules } from '../middleware/validateModel';

export type ProjectCategoryAttributes = {
  categoryId: number;
  categoryName: string;
  isLogicalDeleted: boolean;
};

export const newProjectCategoryValidationRules: ValidationRules = {
  categoryId: {
    required: false,
  },
  categoryName: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 50,
  },
  isLogicalDeleted: {
    required: true,
    type: 'boolean',
  },
};

export const projectCategoryValidationRules: ValidationRules = {
  categoryId: {
    required: true,
    type: 'number',
    validator: (value: number) => value > 0,
  },
  categoryName: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 50,
  },
  isLogicalDeleted: {
    required: true,
    type: 'boolean',
  },
};
export const ProjectCategory = db.define(
  'projectCategory',
  {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    isLogicalDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'project_categories',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  },
);
