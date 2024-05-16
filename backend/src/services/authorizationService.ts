import { sequelizeToResponseArrayHelper } from '../helper/sequelizeToResponseHelper';
import { UserAssignmentAttributes, UserAssignments } from '../models/userAssignments';
import { UserRoleAttributes } from '../models/userRole';

export const addUserRole = async (userId: number, userRoleId: number): Promise<UserRoleAttributes> => {
  const record = await UserAssignments.create({ userId, userRoleId });
  const createdRole = record.get({ plain: true });
  return createdRole;
};

/**
 * @function getUserRoles
 * @description Get roles of the user by the userId.
 * @param {number} userId Unique ID of the user in the database table.
 * @returns {Promise<number[]>} Returns with an array of role IDs.
 */
export const getValidUserRoles = async (userId: number): Promise<number[]> => {
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

/**
 * @function getAllUserRoles
 * @description Get all user roles including not valid ones for the specific user filtered by the parameter.
 * @param userId The selected user's ID.
 * @returns {Promise<Omit<UserAssignmentAttributes, 'userId'>[]>} Returns the role ids and the validity of them in an array.
 */
export const getAllUserRoles = async (
  userId: number,
): Promise<Omit<UserAssignmentAttributes, 'userId'>[]> => {
  const userRoleAssignments = await UserAssignments.findAll({
    attributes: ['userRoleId', 'isValid'],
    where: {
      userId,
    },
  });

  const roles = sequelizeToResponseArrayHelper<UserAssignmentAttributes>(
    userRoleAssignments,
  ).map((role) => ({
    userRoleId: role.userRoleId,
    isValid: role.isValid,
  }));

  return roles;
};
