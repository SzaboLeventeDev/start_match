import { NextFunction, Request, Response } from 'express';
import { generateSession, loginUser, registrateUser } from '../services/authenticationService';
import config from '../config';

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

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await loginUser(req.body);

      if (!user) res.status(401).json({ message: 'Authentication failed!' });

      const session = await generateSession(user.userId);

      res.cookie('session_cookie', session, {
        httpOnly: true,
        expires: session.expires,
        secure: config.isSessionCookieSecure,
        sameSite: 'strict',
        path: '/',
      });

      res.status(200).json({
        message: 'Logged in successfully!',
      });
    } catch (error) {
      next(error);
    }
  },
};

export default authenticationController;
