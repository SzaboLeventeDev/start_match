import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import logger from "../logger";

interface ErrorWithStatus extends Error {
  status?: number;
}
/**
 * @function errorHandler
 * Error handling middleware function
 * @param {ErrorWithStatus} err Error interface extended with other params
 * @param {Request} req Incoming request object
 * @param {Response} res Outgoing response object
 * @param {NextFunction} next Next function
 * @returns {void} There is not any returning value
 */
const errorHandler: ErrorRequestHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode: number = err.status || 500;
  const message: string =
    req.app.get("env") === "development"
      ? err.message
      : "Unknown error happened";
  logger.error(
    `${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  res.status(statusCode);
  res.json({
    error: {
      message,
    },
  });
};

export default errorHandler;
