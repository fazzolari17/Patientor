// import bcrypt from 'bcrypt';
import express, { RequestHandler } from 'express';
import User, { WeatherLocationData } from '../models/user';

// Types
import { Request, Response } from 'express';
import { parseUserUpdateWeatherData } from '../utils/utils';

const userRouter = express.Router();

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
