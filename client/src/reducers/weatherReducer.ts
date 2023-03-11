// Redux
import { Dispatch } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Services
import weatherService from '../services/weather';

// Utils
import {
  // parseForecast,
  parseLocationData,
  timeSinceLastWeatherUpdate,
} from '../utils/utils';

// Types
import { LocationData, WeatherData } from '../types';
import { ForecastWeatherData, LocationDataFromApi } from '../utils/utils';

interface WeatherState {
  locationData: LocationData | null;
  currentWeather: WeatherData | null;
  hourlyForecast: ForecastWeatherData | null;
  dailyForecast: ForecastWeatherData | null;
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
    addWeatherData(state, action) {
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
        dispatch(addWeatherData(weatherWithTimestamp));
      } else {
        const weatherInStorage = localStorage.getItem('weather');
        if (weatherInStorage) {
          const weather = JSON.parse(weatherInStorage);
          dispatch(addWeatherData(weather));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchForecastWeatherData = (lat: number, lon: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const tenMinutes = 600000;
      if (timeSinceLastWeatherUpdate() > tenMinutes) {
        const hourlyForecast =
          await weatherService.fetchHourlyForecastWeatherData(lat, lon);

        const dailyForecast =
          await weatherService.fetchDailyForecastWeatherData(lat, lon);

        const hourlyForecastWithTimestamp = {
          ...hourlyForecast,
          timestamp: Date.now(),
        };

        const dailyForecastWithTimestamp = {
          ...dailyForecast,
          timestamp: Date.now(),
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

export const {
  addWeatherLocation,
  addWeatherData,
  addHourlyForecastData,
  addDailyForecastData,
  resetWeather,
} = weatherSlice.actions;
export default weatherSlice.reducer;
