import express, { Request, RequestHandler, Response } from 'express';
import weatherService from '../services/weatherService';

const weatherRouter = express.Router();

weatherRouter.post('/q', (async (req: Request, res: Response) => {
  try {
    const latSearchQuery = req.query.lat;
    const lonSearchQuery = req.query.lon;

    const response = await weatherService.fetchWeatherDataFromApi(
      latSearchQuery,
      lonSearchQuery,
    );
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}) as RequestHandler);

weatherRouter.post('/geocode', (async (req: Request, res: Response) => {
  try {
    const citySearchQuery = req.query.city;
    if (!citySearchQuery) {
      res.status(400).send({ error: 'missing city from search query' });
    }
    const response = await weatherService.fetchLatandLonFromApi(
      citySearchQuery,
    );

    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}) as RequestHandler);

export default weatherRouter;
