import { sequelizeToResponseHelper } from '../helper/sequelizeToResponseHelper';
import { User, UserAttributes } from '../models/user';

export const getUserById = async (userId: number): Promise<UserAttributes |null> => {
  const userRecord = await User.findOne({
    attributes: [
      'userId',
      'firstName',
      'lastName',
      'dateOfBirth',
      'email',
      'password',
      'isLogicalDeleted',
    ],
    where: {
      userId,
    },
  });

  if (!userRecord) return null;

  const user = sequelizeToResponseHelper<UserAttributes>(userRecord, [
    'userId',
    'firstName',
    'lastName',
    'email',
    'dateOfBirth',
    'password',
    'isLogicalDeleted',
  ]);
  return user;
};
