import { UserAttributes } from '../models/user';

export type RegistrableUserAttributes = Omit<
  UserAttributes,
  'userId' | 'isLogicalDeleted'
> & {
  passwordAgain: string
};
