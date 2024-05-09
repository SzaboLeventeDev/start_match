import { mockSession } from '../../__mocks__/session/mockSession';
import { mockLoginUser, mockRegistrableUser, mockUser } from '../../__mocks__/user/mockUser';
import { sequelizeToResponseHelper } from '../../helper/sequelizeToResponseHelper';
import { SessionAttributes } from '../../models/session';
import { User, UserAttributes } from '../../models/user';
import { getUserByEmail, loginUser, registrateUser } from '../../services/authenticationService';

jest.mock('../../models/user', () => ({
  User: {
    create: jest.fn().mockResolvedValue({
      get: jest.fn<UserAttributes, []>(() => mockUser),
    }),
    findOne: jest.fn().mockResolvedValue(null),
  },
}));

jest.mock('../../models/session', () => ({
  Session: {
    create: jest.fn().mockResolvedValue({
      get: jest.fn<SessionAttributes, []>(() => mockSession),
    }),
  },
}));

jest.mock('../../helper/sequelizeToResponseHelper', () => ({
  _esModule: true,
  sequelizeToResponseHelper: jest.fn(),
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
  hashSync: jest.fn(),
}));
describe('Test cases of Athentication service', () => {
  test('Registration is successful', async () => {
    (User.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await registrateUser(mockRegistrableUser);

    expect(result).toBe('Registration is successful!');
  });

  test('Finding user by email successfully returns user data if exists.', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (sequelizeToResponseHelper as jest.Mock).mockReturnValue(mockUser);
    const result = await getUserByEmail('john.doe@test.com');

    expect(result).toEqual(mockUser);
  });

  test('Finding user by email returns null if user is not exists.', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    const result = await getUserByEmail('john.doe@test.com');

    expect(result).toBeNull();
  });

  test('Authentication fails if user does not exist.', async () => {
    const result = loginUser({ email: 'jane.doe@test.com', password: 'smartMatch_1234' });

    expect(result).rejects.toThrow('Authentication failed!');
  });

  test('Returning session data if authentication is successful.', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (sequelizeToResponseHelper as jest.Mock).mockReturnValue(mockSession);

    const result = await loginUser(mockLoginUser);

    expect(result).toEqual(mockSession);
  });
  afterEach(() => jest.clearAllMocks());
});
