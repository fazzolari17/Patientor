import axios from 'axios';
import {
  ForecastResponseFromApi,
  HourlyWeatherForecast,
  parseForecast,
  parseGeoCodeResponse,
  parseReverseGeocode,
  parseWeatherDataResponse,
  ResponseData,
  ReverseGeocodeResponse,
  WeatherData,
} from '../utils/utils';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const weatherUnits = 'imperial';

export interface GeoCodeData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
  id: string;
}

const fetchCityDataFromApi = async (lat: unknown, lon: unknown) => {
  const limit = 100;
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${OPENWEATHER_API_KEY}`,
    );

    return parseReverseGeocode(response.data[0] as ReverseGeocodeResponse);
  } catch (error) {
    console.error(error);
    return;
  }
};

const fetchLatandLonFromApi = async (
  searchQuery: unknown,
): Promise<GeoCodeData[] | undefined> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=100&appid=${OPENWEATHER_API_KEY}`,
    );
    const data = response.data as ResponseData[];
    return data.map((a) => parseGeoCodeResponse(a));
  } catch (error: unknown) {
    console.error(error);
    return;
  }
};

const fetchCurrentWeatherDataFromApi = async (
  latitude: unknown,
  longitude: unknown,
): Promise<WeatherData | undefined> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=${weatherUnits}`,
    );

    return parseWeatherDataResponse(response.data);
  } catch (error) {
    console.error(error);
    return;
  }
};

const fetchForecastBasedOnTimestampFromApi = async (
  latitude: unknown,
  longitude: unknown,
  forecastLength: unknown,
): Promise<HourlyWeatherForecast | undefined> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=${forecastLength}&appid=${OPENWEATHER_API_KEY}&units=${weatherUnits}`,
    );

    const sanitizedForecast = parseForecast(
      response.data as ForecastResponseFromApi,
    );
    return sanitizedForecast;
  } catch (error) {
    console.error(error);
    return;
  }
};

export default {
  fetchLatandLonFromApi,
  fetchCityDataFromApi,
  fetchCurrentWeatherDataFromApi,
  fetchForecastBasedOnTimestampFromApi,
};
