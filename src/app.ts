import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from './config';
import { Server } from 'socket.io';
import { Routes } from './interfaces/utils/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { logger, stream } from './utils/logger';
import { HttpException } from './exceptions/http.exception';
import listenSockets from './sockets/listen.sockets';

class App {
  public app: express.Application;
  public env: string;
  public port: number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'production';
    this.port = parseInt(PORT) || 3005;

    (async () => {
      this.initializeMiddlewares();
      this.initializeRoutes(routes);
      this.handleUnregisteredRoutes();
      this.initializeErrorHandling();
    })();
  }
  public listen() {
    const server = this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the ${this.port}`);
      logger.info(`=================================`);
    });

    const socket = new Server(server, {
      cors: {
        origin: ORIGIN,
        credentials: CREDENTIALS,
      },
    });

    listenSockets(socket);
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(
      express.json({
        limit: '50mb',
      }),
    );
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
  private handleUnregisteredRoutes() {
    this.app.use((req, res, next) => {
      const error = new HttpException(404, 'Route not found! -> ' + req.originalUrl);
      next(error);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
