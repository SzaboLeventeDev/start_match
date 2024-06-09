import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../services/userService';

const userController = {
  async getUserById(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
      const { userId } = req.params;

      const parsedUserId = Number(userId);
      if (Number.isNaN(parsedUserId)) {
        res.status(422).json({
          message: 'Not a valid user ID',
        });
        return;
      }
      const user = await getUserById(parsedUserId);

      if (!user) {
        res.status(404).json({
          message: 'Cannot find user!',
        });
        return;
      }
      res.status(200).json({ message: 'Getting user data is successful!', user });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
