import { DataTypes } from 'sequelize';
import { db } from '../data/connection';

export interface UserAssignmentAttributes {
  userId: number,
  userRoleId: number,
  isValid: boolean,
}

export const UserAssignments = db.define(
  'userAssignments',
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false,
    // },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userId',
      },
    },
    userRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'userRoles',
        key: 'userRoleId',
      },
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    createdAt: true,
    updatedAt: true,
    timestamps: true,
    tableName: 'userAssignments',
  },
);
