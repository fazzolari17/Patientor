import express, { Request, RequestHandler, Response } from 'express';
import weatherService from '../services/weatherService';

import { reduceForecastToDailyForecast } from '../utils/weather';

const weatherRouter = express.Router();

weatherRouter.get('/dailyforecast', (async (req: Request, res: Response) => {
  try {
    const latSearchQuery = req.query.lat;
    const lonSearchQuery = req.query.lon;
    const forecastLength = req.query.days;

    const forecast = await weatherService.fetchForecastWeatherDataFromApi(
      latSearchQuery,
      lonSearchQuery,
      forecastLength,
    );
    if (!forecast) throw new Error('missing or undefined forecast');

    const dailyForecast = reduceForecastToDailyForecast(forecast);

    res.status(200).send(dailyForecast);
  } catch (error) {
    console.error(error);
  }
}) as RequestHandler);

weatherRouter.get('/forecast', (async (req: Request, res: Response) => {
  try {
    const latSearchQuery = req.query.lat;
    const lonSearchQuery = req.query.lon;
    const forecastLength = req.query.days;

    const forecast = await weatherService.fetchForecastWeatherDataFromApi(
      latSearchQuery,
      lonSearchQuery,
      forecastLength,
    );

    res.status(200).send(forecast);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}) as RequestHandler);

weatherRouter.get('/', (async (req: Request, res: Response) => {
  try {
    const latSearchQuery = req.query.lat;
    const lonSearchQuery = req.query.lon;

    const response = await weatherService.fetchCurrentWeatherDataFromApi(
      latSearchQuery,
      lonSearchQuery,
    );

    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}) as RequestHandler);

weatherRouter.get('/geocode', (async (req: Request, res: Response) => {
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
