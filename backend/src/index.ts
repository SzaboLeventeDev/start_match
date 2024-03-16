import config from './config';
import app from './app';
import logger from './logger';

app.listen(config.port, () => {
  logger.info('Start backend server');
});
