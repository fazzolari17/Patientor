import axios from 'axios';
import {
  parseGeoCodeResponse,
  parseWeatherDataResponse,
  ResponseData,
  WeatherData,
} from '../utils/utils';

const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;
const weatherUnits = 'imperial';

export interface GeoCodeData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
  id: string;
}

const fetchLatandLonFromApi = async (
  searchQuery: unknown,
): Promise<GeoCodeData[] | undefined> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=100&appid=${openWeatherApiKey}`,
    );
    const data = response.data as ResponseData[];
    return data.map((a) => parseGeoCodeResponse(a));
  } catch (error: unknown) {
    console.error(error);
    return;
  }
};

const fetchWeatherDataFromApi = async (
  latitude: unknown,
  longitude: unknown,
): Promise<WeatherData | undefined> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}&units=${weatherUnits}`,
    );
    console.log(response.data);
    return parseWeatherDataResponse(response.data);
  } catch (error) {
    console.error(error);
    return;
  }
};

export default { fetchLatandLonFromApi, fetchWeatherDataFromApi };
