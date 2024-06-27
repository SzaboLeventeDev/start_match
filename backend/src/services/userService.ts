import { sequelizeToResponseHelper } from '../helper/sequelizeToResponseHelper';
import { User, UserAttributes } from '../models/user';

export const getUserById = async (userId: number): Promise<UserAttributes | null> => {
  const userRecord = await User.findOne({
    attributes: ['userId', 'firstName', 'lastName', 'dateOfBirth', 'email', 'password', 'isLogicalDeleted'],
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

/**
 * @function updateUser
 * @description Update user's personal data.
 * @param { UserAttributes } user New data for the update.
 * @returns {Promise<UserAttributes | null>} Returns the updated user data or null as a Promise.
 */
export const updateUser = async (user: UserAttributes): Promise<UserAttributes | null> => {
  const [effectedcount] = await User.update(user, {
    where: {
      userId: user.userId,
    },
  });

  if (effectedcount === 0) return null;

  const updatedUser = await getUserById(user.userId);

  if (!updatedUser) return null;
  return updatedUser;
};