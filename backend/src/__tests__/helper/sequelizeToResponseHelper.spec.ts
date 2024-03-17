import { mockFAQRecords, mockFAQs } from "../../__mocks__/faq/mockFAQ";
import sequelizeToResponseHelper from "../../helper/sequelizeToResponseHelper";
import { QuestionAndAnswerAttributes } from "../../models/questionAndAnswer";

describe("Generic function to cast the incoming data to the specified type", () =>{ 
  test("The function casts the incoming data to the specified type successfully", () => {
    const transformedData = sequelizeToResponseHelper<QuestionAndAnswerAttributes>(mockFAQRecords)

    expect(transformedData).toEqual(mockFAQs)
  })
})