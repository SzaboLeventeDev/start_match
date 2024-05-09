import { mockFAQRecords, mockFAQs } from '../../__mocks__/faq/mockFAQ';
import { mockUserRecord } from '../../__mocks__/user/mockUser';
import { sequelizeToResponseArrayHelper, sequelizeToResponseHelper } from '../../helper/sequelizeToResponseHelper';
import { QuestionAndAnswerAttributes } from '../../models/questionAndAnswer';
import { UserAttributes } from '../../models/user';

describe('Generic function to cast the incoming data to the specified type', () => {
  test('The function casts the incoming data to the specified type successfully', () => {
    const transformedData = sequelizeToResponseArrayHelper<QuestionAndAnswerAttributes>(mockFAQRecords);

    expect(transformedData).toEqual(mockFAQs);
  });

  test('The function retrieves the specified properties from the model successfully', () => {
    const transformedData = sequelizeToResponseHelper<UserAttributes>(mockUserRecord, ['firstName', 'lastName']);

    expect(transformedData).toEqual({ firstName: 'John', lastName: 'Doe' });
  });
});
