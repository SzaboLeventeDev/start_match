import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {
  sequelizeToResponseArrayHelper,
  sequelizeToResponseHelper,
} from '../helper/sequelizeToResponseHelper';
import { User, UserAttributes } from '../models/user';
import { LoginUserAttributes, RegistrableUserAttributes } from '../types/user';
import { Session, SessionAttributes } from '../models/session';
import { UserRoleAttributes } from '../models/userRole';
import { UserAssignments } from '../models/userAssignments';
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
      'password',
      'isLogicalDeleted',
    ],
    where: {
      email,
    },
  });

  if (!userRecords) return null;

  const user = sequelizeToResponseHelper<UserAttributes>(userRecords, [
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
 * @function decryptPassword
 * @description Decrypting password and compare them.
 * @param {string} password Incoming password.
 * @param {string} hashedPassword Stored password.
 * @returns {boolean} Returns if the passwords are matching or not.
 */
const decryptPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
  return isPasswordMatching;
};

/**
 * @function generateSession
 * @description Generate session for the frontend application
 * @returns {string} Returns the generated session.
 */
export const generateSession = async (
  userId: number,
): Promise<SessionAttributes> => {
  const record = await Session.create({
    sessionId: uuidv4(),
    userId,
    data: {},
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  });

  const session = sequelizeToResponseHelper<SessionAttributes>(record, [
    'sessionId',
    'data',
    'expires',
  ]);
  return session;
};

/**
 * @function registrateUser
 * @description Register a new user to the database.
 * @param {RegistrableUserAttributes} registrationData Data added by the user
 * @returns {Promise<string>} Returning text with information about the result of the registration.
 */
export const registrateUser = async (
  registrationData: RegistrableUserAttributes,
): Promise<string> => {
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

/**
 * @function loginUser
 * @description Login user service.
 * Get information from the database based on the incoming email address.
 * @param {LoginUserAttributes} loginData Incoming object includes email and password.
 * @returns {UserAttributes} Returns the authenticated user.
 */
export const loginUser = async (
  loginData: LoginUserAttributes,
): Promise<UserAttributes> => {
  const user = await getUserByEmail(loginData.email);

  if (!user) throw new Error('Authentication failed!');

  const isPasswordMatching = await decryptPassword(
    loginData.password,
    user.password,
  );

  if (!isPasswordMatching) {
    throw new Error('Authentication failed');
  }
  return user;
};

/**
 * @function getUserRoles
 * @description Get roles of the user by the userId.
 * @param {number} userId Unique ID of the user in the database table.
 * @returns {Promise<number[]>} Returns with an array of role IDs.
 */
export const getUserRoles = async (userId: number): Promise<number[]> => {
  const userRoleAssignments = await UserAssignments.findAll({
    attributes: ['userRoleId'],
    where: {
      userId,
      isValid: true,
    },
  });

  const roleIds = sequelizeToResponseArrayHelper<UserRoleAttributes>(userRoleAssignments)
    .map((role) => role.userRoleId);

  return roleIds;
};
