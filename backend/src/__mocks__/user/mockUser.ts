import { UserAttributes } from '../../models/user';
import { LoginUserAttributes, RegistrableUserAttributes } from '../../types/user';

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

export const mockUserRecord: any = {
  userId: 1,
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: new Date('2000-01-01'),
  email: 'john.doe@test.com',
  password: '$2b$10$92vQ8pjRFod/sy7pxQqH..yjfmvam5hLp6ofGw5Nz11pPtwicCxpC',
  isLogicalDeleted: false,
  toJSON() {
    return {
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      email: this.email,
      password: this.password,
      isLogicalDeleted: this.isLogicalDeleted,
    };
  },
};

export const mockRegistrableUser: RegistrableUserAttributes = {
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: new Date('2000-01-01'),
  email: 'john.doe@test.com',
  password: '$2b$10$92vQ8pjRFod/sy7pxQqH..yjfmvam5hLp6ofGw5Nz11pPtwicCxpC',
  passwordAgain: '$2b$10$92vQ8pjRFod/sy7pxQqH..yjfmvam5hLp6ofGw5Nz11pPtwicCxpC',
};

export const mockLoginUser: LoginUserAttributes = {
  email: 'john.doe@test.com',
  password: 'smartMatch_1234',
};
