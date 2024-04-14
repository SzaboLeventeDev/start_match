import { mockRegistratedUserToProcess, mockUser } from '../../__mocks__/user/mockUser';
import { User, UserAttributes } from '../../models/user';
import { registrateUser } from '../../services/authenticationService';

jest.mock('../../models/user', () => ({
  User: {
    create: jest.fn().mockResolvedValue({
      get: jest.fn<UserAttributes, []>(() => mockUser),
    }),
    findOne: jest.fn().mockResolvedValue(null),
  },
}));

jest.mock('../../helper/sequelizeToResponseHelper', () => ({
  _esModule: true,
  sequelizeToResponseHelper: jest.fn().mockImplementation((models) => models),
}));

describe('Test cases of Athentication service', () => {
  test('Registration is successful', async () => {
    (User.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await registrateUser(mockRegistratedUserToProcess);

    expect(result).toBe('Registration is successful!');
  });
});
