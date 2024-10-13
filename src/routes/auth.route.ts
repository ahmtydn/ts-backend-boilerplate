import { Router } from 'express';
import { Routes } from '../interfaces/utils/routes.interface';
import AuthController from '../controllers/auth.controllers';

class AuthRoute implements Routes {
  public router = Router();
  public authController = new AuthController();
  public path = '/auth';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/health-check`, this.authController.healthCheck);
  }
}

export default AuthRoute;
