import { sequelizeToResponseArrayHelper } from "../helper/sequelizeToResponseHelper"
import { QuestionAndAnswer, QuestionAndAnswerAttributes } from "../models/questionAndAnswer"

export const getAllFAQs = async(): Promise<QuestionAndAnswerAttributes[]> => {
  const models = await QuestionAndAnswer.findAll({attributes: ['questionId', 'question','answer', 'categoryId']})
  const response = sequelizeToResponseArrayHelper<QuestionAndAnswerAttributes>(models)
  return response
}