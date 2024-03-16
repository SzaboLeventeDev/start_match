import {getAllFAQs} from '../../services/questionAndAnswerService'
import { QuestionAndAnswer, QuestionAndAnswerAttributes } from '../../models/questionAndAnswer'
import { mockFAQs } from '../../__mocks__/faq/mockFAQ';

jest.mock('../../models/questionAndAnswer', () => ({
  QuestionAndAnswer: {
    findAll: jest.fn() as jest.Mock<Promise<QuestionAndAnswerAttributes[]>>
  }
}))

jest.mock("../../helper/sequelizeToResponseHelper", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((models) => models),
}));



describe('Test cases of FAQs service', () => {
  test('The service should retrieve all of the questions with the answers', async() => {
    (QuestionAndAnswer.findAll as jest.Mock).mockResolvedValue(mockFAQs);
    const result = await getAllFAQs()

    expect(QuestionAndAnswer.findAll).toHaveBeenCalled()
    expect(result).toEqual(mockFAQs)
  })
})