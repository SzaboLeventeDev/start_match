import { DataTypes } from 'sequelize';
import { db } from '../data/connection';

export interface UserRoleAttributes {
  userRoleId: number;
  userRoleName: string;
}

export const UserRole = db.define(
  'userRole',
  {
    userRoleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userRoleName: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    createdAt: true,
    updatedAt: true,
    timestamps: true,
    tableName: 'userRoles',
  },
);
