import mongoose from 'mongoose';
import logger from './logger';
import { parseString } from './utils';
import config from './config';

const start = Date.now();
const MONGODB_URI = parseString('MONGODB_URI', config.MONGODB_URI);

logger.info('Connecting to', MONGODB_URI);

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('connected to MongoDB');
    logger.info(
      `It has taken ${
        (Date.now() - start) / 1000
      } seconds to connect to Mongo_DB`
    );
  } catch (error) {
    if (typeof error === 'string') {
      logger.info(error);
    } else if (error instanceof Error) {
      logger.error('Error connecting to MongoDB:', error.message);
    }
  }
};

export default connectToDatabase;
