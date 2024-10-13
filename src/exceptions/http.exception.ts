import { logger } from '../utils/logger';

export class HttpException extends Error {
  public status: number;
  public message: string;
  public screenMessage?: string;

  constructor(status: number, message: string, error?: any, screenMessage?: string) {
    super(message);
    this.status = error?.response?.statusCode || status;
    this.message = error?.response?.body?.message || error?.message || message;
    this.screenMessage = screenMessage;
    logger.error(this.message, error);
  }
}
