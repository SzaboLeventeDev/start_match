import { DataTypes } from 'sequelize';
import { UUID } from 'crypto';
import { db } from '../data/connection';

export interface SessionAttributes {
  sessionId: UUID,
  // userId: number,
  data: object,
  expires: Date,
}

export const Session = db.define(
  'session',
  {
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
