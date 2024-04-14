import omitProps from '../../helper/omitProps';
import { UserAttributes } from '../../models/user';

interface MockUserAttributes extends UserAttributes {
get(options?: {plain: boolean}): UserAttributes
}
export const mockUser: MockUserAttributes = {
  userId: 1,
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: new Date('2000-01-01'),
  email: 'john.doe@test.com',
  password: '$2b$10$92vQ8pjRFod/sy7pxQqH..yjfmvam5hLp6ofGw5Nz11pPtwicCxpC',
  isLogicalDeleted: false,
  get() {
    return {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('2000-01-01'),
      email: 'john.doe@test.com',
      password: '$2b$10$92vQ8pjRFod/sy7pxQqH..yjfmvam5hLp6ofGw5Nz11pPtwicCxpC',
      isLogicalDeleted: false,
    };
  },
};

export const mockRegistratedUserToProcess: Pick<UserAttributes, 'firstName' | 'lastName' | 'dateOfBirth' | 'email' | 'password'> = omitProps(mockUser, 'userId', 'isLogicalDeleted', 'get');
