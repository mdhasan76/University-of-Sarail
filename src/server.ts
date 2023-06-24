import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error('uncaught exection is detect', error);
  process.exit(1);
});

main().catch(err => errorLogger.error(err));

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Server is connected succeflly');

    server = app.listen(config.port, () => {
      logger.info('server is running on the ', config.port);
    });
  } catch (err) {
    errorLogger.error('Server not connected', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

process.on('SIGTERM', err => {
  logger.info('Sigterm is recive', err);
  if (server) {
    server.close();
  }
});
