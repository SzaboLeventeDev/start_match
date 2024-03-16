import { DataTypes } from "sequelize";
import { db } from "../data/connection";

export interface QuestionAndAnswerAttributes {
  questionId: number,
  question: string,
  answer: string,
  isLogicalDeleted: boolean
}
export const QuestionAndAnswer = db.define("questionAndAnswer", 
{
  questionId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  question: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  answer: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  isLogicalDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
},
{
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  tableName: "questions_and_answers"
},
)