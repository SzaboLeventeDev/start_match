import { DataTypes } from 'sequelize';
import { db } from '../data/connection';
import { v4 as uuidv4 } from 'uuid';

export interface SessionAttributes {
  sessionId: string;
  // userId: number,
  data: object;
  expires: Date;
}

export const Session = db.define(
  'session',
  {
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: 'sessions',
  },
);
