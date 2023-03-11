import axios from 'axios';
import { API_BASE_URI } from '../constants';

const fetchLatandLonFromApi = async (searchQuery: string) => {
  const response = await axios.get(
    `${API_BASE_URI}/weather/geocode?city=${searchQuery}`
  );
  return response.data;
};

const fetchCurrentWeatherDataFromApi = async (lat: number, lon: number) => {
  const response = await axios.get(
    `${API_BASE_URI}/weather?lat=${lat}&lon=${lon}`
  );

  return response.data;
};

const fetchHourlyForecastWeatherData = async (lat: number, lon: number) => {
  const days = 100;
  try {
    const response = await axios.get(
      `${API_BASE_URI}/weather/forecast?lat=${lat}&lon=${lon}&days=${days}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchDailyForecastWeatherData = async (lat: number, lon: number) => {
  const days = 100;
  try {
    const response = await axios.get(
      `${API_BASE_URI}/weather/dailyforecast?lat=${lat}&lon=${lon}&days=${days}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  fetchLatandLonFromApi,
  fetchCurrentWeatherDataFromApi,
  fetchHourlyForecastWeatherData,
  fetchDailyForecastWeatherData,
};
