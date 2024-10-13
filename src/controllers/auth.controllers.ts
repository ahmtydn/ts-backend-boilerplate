import { NextFunction, Response } from 'express';

import { RequestWithUser } from '../interfaces/utils/requests.dto';
import AuthService from '../services/auth.service';

class AuthController {
  public authService = new AuthService();

  public healthCheck = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      await this.authService.healthCheck();
      return res.status(200).send({ message: 'OK' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
