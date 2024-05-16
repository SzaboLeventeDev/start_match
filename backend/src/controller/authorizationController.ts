import { NextFunction, Request, Response } from 'express';
import { addUserRole, getAllUserRoles } from '../services/authorizationService';

const authorizationController = {
  async addUserRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, userRoleId } = req.body;

      if (!userId || !userRoleId) {
        res.status(400).json({ message: 'Bad request' });
        return;
      }
      const existingUserRoles = await getAllUserRoles(userId);
      const existingRole = existingUserRoles.find((userRole) => userRole.userRoleId);

      if (existingRole?.isValid) {
        res.status(400).json({ message: 'Role already exists!' });
        return;
      }
      const userRole = await addUserRole(userId, userRoleId);

      if (!userRole) {
        res.status(500).json({ message: 'Internal Server Error: Unable to add role.' });
        return;
      }

      res.status(201).json({ message: 'User role added successfully!', userRoleId: userRole.userRoleId });
    } catch (error) {
      next(error);
    }
  },
};

export default authorizationController;
