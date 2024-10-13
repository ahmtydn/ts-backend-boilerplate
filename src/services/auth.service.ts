import { logger } from '../utils/logger';

class AuthService {
  public async healthCheck() {
    logger.info('Health check! All is well!');
    return;
  }
}

export default AuthService;
