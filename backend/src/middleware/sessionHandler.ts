import { NextFunction, Request, Response } from 'express';
import { Session, SessionAttributes } from '../models/session';
import { sequelizeToResponseHelper } from '../helper/sequelizeToResponseHelper';

interface CustomRequest extends Request {
  session: SessionAttributes;
}

/**
 * @function sessionHandler
 * @description Session handler middleware to manage incoming sessionId-s from the frontend.
 * If the sessionId or the session is not found, the middleware sends back error message.
 * @param {Request} req Incoming request object
 * @param {Response} res Outgoing response object
 * @param {NextFunction} next Next function
 * @returns {Promise<Response>} Returns with the response.
 */
export const sessionHandler = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response> => {
  const sessionId = req.cookies('session_cookie');

  if (!sessionId) return res.status(401).json({ message: 'No session found!' });

  try {
    const session = await Session.findByPk(sessionId);

    if (!session) return res.status(403).json({ message: 'Session not found!' });
    const resSession = sequelizeToResponseHelper<SessionAttributes>(session, ['data', 'expires', 'sessionId']);

    if (resSession.expires < new Date()) {
      return res.status(403).json({ message: 'Session expired, please log in again!' });
    }

    req.session = resSession;
    next();
  } catch (error) {
    next(error);
  }
};
