import express from 'express';
import cors from 'cors';
import { parseString } from './utils/utils';

import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patient';
import userRouter from './routes/signup';
import loginRouter from './routes/login';
import config from '../src/utils/config';
import logger from '../src/utils/logger';
import middleware from './utils/middleware';
import mongoose from 'mongoose';

const app = express();

const MONGODB_URI = parseString('MONGODB_URI', config.MONGODB_URI);

logger.info('Connecting to', MONGODB_URI);
const start = Date.now();
logger.info();
// mongoose
//   .connect(MONGODB_URI)
//   .then(() => { 
//     logger.info('connected to MongoDB');
//     logger.info(Date.now() - start);
//   })
//   .catch((error) => {
//     if (typeof error === 'string') {
//       logger.info(error);
//     } else if (error instanceof Error) {
//       logger.error('Error connecting to MongoDB:', error.message);
//     }
//   });
  const connectToDatabase = async (): Promise<void> => {
    try {
      await mongoose.connect(MONGODB_URI);
      logger.info('connected to MongoDB');
         logger.info(Date.now() - start);
    } catch (error) {
      if (typeof error === 'string') {
        logger.info(error);
      } else if (error instanceof Error) {
        logger.error('Error connecting to MongoDB:', error.message);
      }
    }
  };
void connectToDatabase();
app.use(express.static('front'));
app.use(cors());
app.use(express.json());

app.use(middleware.tokenExtractor);

app.use(middleware.requestLogger);

app.get('/api/ping', (_req, res) => {
  console.log(`Someone Pinged Here`);
  res.status(200).send('pong');
});

app.get('/api/health', (_req, res) => {
  res.status(200).send('200 ok');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);
app.use('/api/signup', userRouter);
app.use('/api/login', loginRouter);

export default app;
