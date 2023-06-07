import { HourlyWeatherForecast, findMostFrequent } from './utils';

import {
  IndividualHourlyForecast,
  IndividualDailyForecastWeather,
} from '../types';
import { v4 as uuid } from 'uuid';

const getDayOfWeek = (day: number): string => {
  switch (day) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
    default:
      return 'Missing';
  }
};

export const reduceForecastToDailyForecast = (
  forecast: HourlyWeatherForecast,
) => {
  interface ForecastObject {
    0: IndividualHourlyForecast[];
    1: IndividualHourlyForecast[];
    2: IndividualHourlyForecast[];
    3: IndividualHourlyForecast[];
    4: IndividualHourlyForecast[];
    5: IndividualHourlyForecast[];
    6: IndividualHourlyForecast[];
  }

  let forecastObject: ForecastObject = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  const consolidateEachDayIntoArray = () => {
    forecast.list.forEach((item) => {
      const day = new Date(item.dt * 1000).getDay();

      forecastObject = {
        ...forecastObject,
        [day]: [...forecastObject[day as keyof typeof forecastObject], item],
      };
    });
  };

  const reduceEachKeyIntoSingleObject = () => {
    interface ReducedForecastObject {
      0: IndividualDailyForecastWeather | Record<string, never>;
      1: IndividualDailyForecastWeather | Record<string, never>;
      2: IndividualDailyForecastWeather | Record<string, never>;
      3: IndividualDailyForecastWeather | Record<string, never>;
      4: IndividualDailyForecastWeather | Record<string, never>;
      5: IndividualDailyForecastWeather | Record<string, never>;
      6: IndividualDailyForecastWeather | Record<string, never>;
    }

    let reducedForecastObject: ReducedForecastObject = {
      0: {},
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
    };

    const objectLength = Object.keys(forecastObject).length;

    for (let i = 0; i < objectLength; i++) {
      if (forecastObject[i as keyof typeof forecastObject].length === 0) {
        // console.log(i, forecastObject[i as keyof typeof forecastObject]);
        reducedForecastObject = {
          ...reducedForecastObject,
          [i]: {},
        };
        continue;
      }

      const lengthOfDay =
        forecastObject[i as keyof typeof forecastObject].length;
      const dt_txt = forecastObject[i as keyof typeof forecastObject][0].dt_txt;
      const dt = forecastObject[i as keyof typeof forecastObject][0].dt;

      const humidityArr: number[] = [];
      const lowArr: number[] = [];
      const highArr: number[] = [];
      const weatherArr: Array<IndividualHourlyForecast['weather']> = [];

      forecastObject[i as keyof typeof forecastObject].forEach((day) => {
        humidityArr.push(day.main.humidity);
        lowArr.push(day.main.temp_min);
        highArr.push(day.main.temp_max);
        weatherArr.push(day.weather);
      });

      const humidity: number = humidityArr.reduce((a, b) => a + b, 0);
      const temp_min: number = lowArr.sort((a, b) => a - b)[0];
      const temp_max: number = highArr.sort((a, b) => b - a)[0];
      const weather: IndividualHourlyForecast['weather'][0] =
        findMostFrequent(weatherArr);

      reducedForecastObject = {
        ...reducedForecastObject,
        [i]: {
          main: {
            temp_min: temp_min.toFixed(),
            temp_max: temp_max.toFixed(),
            humidity: (humidity / lengthOfDay).toFixed(),
          },
          weather: weather,
          dt_txt,
          dt,
          day: getDayOfWeek(i),
          key: i,
          id: uuid(),
        },
      };
    }

    let listArray = Object.keys(reducedForecastObject).map((key: unknown) => ({
      ...reducedForecastObject[key as keyof typeof reducedForecastObject],
    }));

    listArray = listArray.filter((item) => {
      if (item.main) {
        return item;
      }
      return;
    });

    return {
      cod: forecast.cod,
      message: forecast.message,
      cnt: forecast.cnt,
      list: listArray,
      city: {
        id: forecast.city.id,
        name: forecast.city.name,
        country: forecast.city.country,
        coord: { lat: forecast.city.coord.lat, lon: forecast.city.coord.lon },
        population: forecast.city.population,
        timezone: forecast.city.timezone,
        sunrise: forecast.city.sunrise,
        sunset: forecast.city.sunset,
      },
    };
  };

  consolidateEachDayIntoArray();
  reduceEachKeyIntoSingleObject();
  return reduceEachKeyIntoSingleObject();
};
