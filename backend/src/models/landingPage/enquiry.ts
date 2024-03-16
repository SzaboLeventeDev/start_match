import { DataTypes } from "sequelize";
import { db } from "../../data/connection";
import { ValidationRules } from "../../middleware/validateModel";

export interface EnquiryAttributes {
  id?: number,
  email: string,
  categoryId: number,
  message: string
}

export const enquiryValidationRules: ValidationRules = {
  id: {
    required: false,
    type: "number"
  },
  email: {
    required: true, 
    type: "string"
  },
  categoryId: {
    required: true,
    type: "number"
  },
  message: {
    required: true,
    type: "string"
  }
}

export const Enquiry = db.define(
  "enquiry",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);