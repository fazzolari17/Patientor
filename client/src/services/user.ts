import axios from 'axios';

// Constants
import { API_BASE_URI } from '../constants';

// Types
import { LocationData } from '../types/weather';

const fetchUserDataFromServer = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URI}/user?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateWeatherDataToUserProfile = async (
  userId: string,
  weatherLocationData: LocationData
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URI}/user/addweather?userId=${userId}`,
      weatherLocationData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { updateWeatherDataToUserProfile, fetchUserDataFromServer };
