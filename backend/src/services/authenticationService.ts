import bcrypt from 'bcrypt';

import { sequelizeToResponseHelper } from '../helper/sequelizeToResponseHelper';
import { User, UserAttributes } from '../models/user';
import { RegistrableUserAttributes } from '../types/user';
import logger from '../logger';
/**
 * @function getUserByEmail
 * @description Search user from the database by email address.
 * @param {string} email Email address
 * @returns {Promise<UserAttributes| null>} Returns with the actual user if exists or null.
 */
export const getUserByEmail = async (
  email: string,
): Promise<UserAttributes | null> => {
  const userRecords = await User.findOne({
    attributes: [
      'userId',
      'firstName',
      'lastName',
      'dateOfBirth',
      'email',
      'isLogicalDeleted',
    ],
    where: {
      email,
    },
  });

  if (!userRecords) return null;

  const user = sequelizeToResponseHelper<UserAttributes>(userRecords);
  return user;
};

/**
 * @function encryptPassword
 * @description Encrypting password using bcrypt
 * @param password Password
 * @returns {string} Returns with the hashed password
 */
const encryptPassword = (password: string): string => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
};

/**
 * @function registrateUser
 * @description Register a new user to the database.
 * @param {RegistrableUserAttributes} registrationData Data added by the user
 * @returns {Promise<string>} Returning text with information about the result of the registration.
 */
export const registrateUser = async (registrationData: RegistrableUserAttributes):Promise<string> => {
  const user = await getUserByEmail(registrationData.email);

  if (user) throw new Error('The user is already exists!');

  if (registrationData.password !== registrationData.passwordAgain) throw new Error('The password is not matching for the registration!');

  const data: RegistrableUserAttributes = {
    ...registrationData,
    password: encryptPassword(registrationData.password),
  };

  await User.create({ ...data, isLogicalDeleted: false });

  return 'Registration is successful!';
};
