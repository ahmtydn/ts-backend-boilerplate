import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/utils/requests.dto';
import { HttpException } from '../exceptions/http.exception';
import { errorMessage } from '../utils/error.messages';

const requiredMiddleware = (requiredFields: string[]) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const locale = req.headers['content-language'];
    try {
      const body = req.body;
      const missingFields = requiredFields.filter(field => !body[field]);
      if (missingFields.length) {
        return next(
          new HttpException(
            400,
            'Missing required fields!',
            null,
            errorMessage(locale, 400, `\nThe following fields are required: ${missingFields.join(', ')}`),
          ),
        );
      }
      next();
    } catch (error) {
      next(new HttpException(400, 'Missing required fields!', error, errorMessage(locale, 400)));
    }
  };
};

// Specific middleware for register route
export const requiredRegister = requiredMiddleware(['email', 'password', 'name', 'surname']);

export default requiredMiddleware;
