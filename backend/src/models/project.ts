import { DataTypes } from 'sequelize';
import { db } from '../data/connection';
import { ValidationRules } from '../middleware/validateModel';
import omitProps from '../helper/omitProps';
import { Contact, User } from './user';
import { Currency, CurrencyAttributes } from './currency';
import { ProjectCategory, ProjectCategoryAttributes } from './projectCategory';

export type ProjectAttributes = {
  projectId: number;
  projectName: string;
  categoryId: number;
  startDate: Date;
  description: string;
  contactId: number;
  startingAmount: number;
  currencyId: number;
  isLogicalDeleted: boolean;
  contact?: Contact;
  currency?: CurrencyAttributes;
  category?: ProjectCategoryAttributes;
};

export const projectValidationRules: ValidationRules = {
  projectId: {
    required: true,
    type: 'number',
    validator: (value: number) => value > 0,
  },
  projectName: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 150,
  },
  categoryId: {
    required: true,
    type: 'number',
    validator: (value: number) => value > 0,
  },
  startDate: {
    required: true,
    type: 'string',
    validator: (value: string) => {
      const dateValue = new Date(value).getTime();

      if (isNaN(dateValue)) {
        return false;
      }

      return dateValue >= Date.now();
    },
  },
  description: {
    required: false,
    maxLength: 1000,
  },
  contactId: {
    required: true,
    type: 'number',
    validator: (value: number) => value > 0,
  },
  startingAmount: {
    required: true,
    type: 'number',
    validator: (value: number) => value > 0,
  },
  currencyId: {
    required: true,
    type: 'number',
    validator: (value: number) => value > 0,
  },
  isLogicalDeleted: {
    required: true,
    type: 'boolean',
  },
};

export const newProjectValidationRules: ValidationRules = omitProps(projectValidationRules, 'projectId');

export const Project = db.define(
  'project',
  {
    projectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    projectName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'project_categories',
        key: 'categoryId',
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'userId',
      },
    },
    startingAmount: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    currencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'currencies',
        key: 'currencyId',
      },
    },
    isLogicalDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'projects',
    timestamps: true,
  },
);

Project.belongsTo(User, { foreignKey: 'contactId', as: 'contact' });
Project.belongsTo(Currency, { foreignKey: 'currencyId' });
Project.belongsTo(ProjectCategory, { foreignKey: 'categoryId', as: 'category' });
