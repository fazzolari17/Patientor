import express, { RequestHandler } from 'express';
import User, { WeatherLocationData } from '../models/user';

// Types
import { Request, Response } from 'express';
import { parseUserUpdateWeatherData } from '../utils/utils';

const userRouter = express.Router();

userRouter.get('/', (async (request: Request, response: Response) => {
  const userId = request.query.userId;

  const mongoResponse = await User.findById(userId);

  response.status(200).send(mongoResponse);
}) as RequestHandler);

userRouter.get('/allUsers', (async (request: Request, response: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = request.body;

  const mongoResponse = await User.find({});

  if (body.email === 'root@gmail.com') {
    response.status(200).send(mongoResponse);
  }
  response.status(401).json({
    error:
      'unauthorized user you do not have credentials to view this information',
  });
}) as RequestHandler);

userRouter.post('/addWeather', (async (
  request: Request,
  response: Response,
) => {
  const userId = request.query.userId;
  const body = request.body as WeatherLocationData;

  const update = { weatherLocationData: parseUserUpdateWeatherData(body) };

  const mongoResponse = await User.findByIdAndUpdate(userId, update, {
    new: true,
  });

  console.log(mongoResponse);
  response.status(200).send(mongoResponse);
}) as RequestHandler);

export default userRouter;
