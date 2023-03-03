import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import connectToDatabase from './utils/databaseConnection';
import middleware from './utils/middleware';

import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patient';
import signupRouter from './routes/signup';
import loginRouter from './routes/login';
import weatherRouter from './routes/weather';
import userRouter from './routes/user';

const app = express();

void connectToDatabase();
// app.use(express.static('front'));
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

// Unprotected Routes
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);

// Protected Routes
app.use('/api/user', middleware.userExtractor, userRouter);
app.use('/api/diagnoses', middleware.userExtractor, diagnosesRouter);
app.use('/api/patients', middleware.userExtractor, patientRouter);
app.use(
  '/api/weather',
  // middleware.userExtractor,
  weatherRouter,
);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
export default app;
