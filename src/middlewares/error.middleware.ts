import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/http.exception';
import { logger } from '../utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    const screenMessage: string = error.screenMessage || message;

    logger.error(
      `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message} \n ${screenMessage ? 'ScreenMessage:: ' + screenMessage : ''}`,
    );
    return res.status(status).json({ status_code: status, message, screen_message: screenMessage });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
