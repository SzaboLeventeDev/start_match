import sequelizeToResponseHelper from "../helper/sequelizeToResponseHelper"
import { QuestionAndAnswer, QuestionAndAnswerAttributes } from "../models/questionAndAnswer"

export const qetAllFAQs = async(): Promise<QuestionAndAnswerAttributes[]> => {
  const models = await QuestionAndAnswer.findAll({attributes: ['questionId', 'question','answer', 'categoryId']})
  const response = sequelizeToResponseHelper<QuestionAndAnswerAttributes>(models)
  return response
}