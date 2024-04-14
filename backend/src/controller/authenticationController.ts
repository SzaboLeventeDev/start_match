import { NextFunction, Request, Response } from 'express';
import { registrateUser } from '../services/authenticationService';

const authenticationController = {
  async registrateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registrateUser(req.body);

      res.status(201).json({
        message: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default authenticationController;
