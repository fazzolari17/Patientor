// Redux
import { Dispatch } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Services
import weatherService from '../services/weather';

// Utils
import { parseLocationData, timeSinceLastWeatherUpdate } from '../utils/utils';

// Types
import {
  LocationData,
  WeatherData,
  HourlyWeatherForecast,
} from '../types/weather';
import { LocationDataFromApi } from '../utils/utils';
import { IndividualDailyForecastWeather } from '../types/weather';

interface WeatherState {
  locationData: LocationData | null;
  currentWeather: WeatherData | null;
  hourlyForecast: HourlyWeatherForecast | null;
  dailyForecast: HourlyWeatherForecast | null;
}

const initialState: WeatherState = {
  locationData: null,
  currentWeather: null,
  hourlyForecast: null,
  dailyForecast: null,
};

const weatherFromStorage = localStorage.getItem('weather');

const weatherSlice = createSlice({
  name: 'weather',
  initialState: weatherFromStorage
    ? JSON.parse(weatherFromStorage)
    : initialState,
  reducers: {
    addWeatherLocation(state, action) {
      return { ...state, locationData: action.payload };
    },
    addCurrentWeatherData(state, action) {
      return { ...state, weatherData: action.payload };
    },
    addHourlyForecastData(state, action) {
      return { ...state, hourlyForecast: action.payload };
    },
    addDailyForecastData(state, action) {
      return { ...state, dailyForecast: action.payload };
    },
    resetWeather: () => initialState,
  },
});

export const setWeatherLocationData = (locationData: LocationDataFromApi) => {
  return (dispatch: Dispatch) => {
    try {
      locationData = parseLocationData(locationData);
      dispatch(addWeatherLocation(locationData));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchCurrentWeatherData = (lat: number, lon: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const tenMinutes = 600000;
      if (timeSinceLastWeatherUpdate() > tenMinutes) {
        const response = await weatherService.fetchCurrentWeatherDataFromApi(
          lat,
          lon
        );

        const weatherWithTimestamp = { ...response, timestamp: Date.now() };

        localStorage.setItem('weather', JSON.stringify(weatherWithTimestamp));
        dispatch(addCurrentWeatherData(weatherWithTimestamp));
      } else {
        const weatherInStorage = localStorage.getItem('weather');
        if (weatherInStorage) {
          const weather = JSON.parse(weatherInStorage);
          dispatch(addCurrentWeatherData(weather));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchForecastBasedOnTimestamp = (lat: number, lon: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const tenMinutes = 600000;
      if (timeSinceLastWeatherUpdate() > tenMinutes) {
        const hourlyForecast =
          await weatherService.fetchHourlyHourlyWeatherForecast(lat, lon);

        let dailyForecast =
          await weatherService.fetchDailyHourlyWeatherForecast(lat, lon);

        dailyForecast = {
          ...dailyForecast,
          list: dailyForecast.list.sort(
            (
              a: IndividualDailyForecastWeather,
              b: IndividualDailyForecastWeather
            ) => {
              return Number(a.dt) - Number(b.dt);
            }
          ),
        };

        const hourlyForecastWithTimestamp = {
          timestamp: Date.now(),
          ...hourlyForecast,
        };

        const dailyForecastWithTimestamp = {
          timestamp: Date.now(),
          ...dailyForecast,
          list: [...dailyForecast.list],
        };

        dispatch(addHourlyForecastData(hourlyForecastWithTimestamp));
        localStorage.setItem(
          'hourlyForecast',
          JSON.stringify(hourlyForecastWithTimestamp)
        );

        dispatch(addDailyForecastData(dailyForecastWithTimestamp));
        localStorage.setItem(
          'dailyForecast',
          JSON.stringify(dailyForecastWithTimestamp)
        );
      } else {
        const hourlyForecastInStorage = localStorage.getItem('hourlyForecast');
        const dailyForecastInStorage = localStorage.getItem('hourlyForecast');
        if (hourlyForecastInStorage) {
          const hourlyForecast = JSON.parse(hourlyForecastInStorage);
          dispatch(addHourlyForecastData(hourlyForecast));
        }
        if (dailyForecastInStorage) {
          const dailyForecast = JSON.parse(dailyForecastInStorage);
          dispatch(addDailyForecastData(dailyForecast));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchForecastRegardlessOfTimestamp = (
  lat: number,
  lon: number
) => {
  return async (dispatch: Dispatch) => {
    try {
      const hourlyForecast =
        await weatherService.fetchHourlyHourlyWeatherForecast(lat, lon);

      const dailyForecast =
        await weatherService.fetchDailyHourlyWeatherForecast(lat, lon);

      const hourlyForecastWithTimestamp = {
        timestamp: Date.now(),
        ...hourlyForecast,
      };

      const dailyForecastWithTimestamp = {
        timestamp: Date.now(),
        ...dailyForecast,
        list: [...dailyForecast.list],
      };

      dispatch(addHourlyForecastData(hourlyForecastWithTimestamp));
      localStorage.setItem(
        'hourlyForecast',
        JSON.stringify(hourlyForecastWithTimestamp)
      );

      dispatch(addDailyForecastData(dailyForecastWithTimestamp));
      localStorage.setItem(
        'dailyForecast',
        JSON.stringify(dailyForecastWithTimestamp)
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchDailyForecast = (lat: number, lon: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const dailyForecast =
        await weatherService.fetchDailyHourlyWeatherForecast(lat, lon);

      dispatch(addDailyForecastData(dailyForecast));
    } catch (error) {
      console.error(error);
    }
  };
};

export const {
  addWeatherLocation,
  addCurrentWeatherData,
  addHourlyForecastData,
  addDailyForecastData,
  resetWeather,
} = weatherSlice.actions;
export default weatherSlice.reducer;
