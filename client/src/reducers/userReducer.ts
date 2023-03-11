// Redux
import { Dispatch } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Types
import { ILoginCredentials, ILoggedInUser, ApiGeocodeResults } from '../types';

// reducers
import { resetDiagnoses, setDiagnoses } from './diagnosesReducer';
import { resetPatients, setAllPatients } from './patientReducer';

// Services
import loginService from '../services/login';
import patientService from '../services/patients';
import diagnosesService from '../services/diagnoses';
import userService from '../services/user';
import weatherService from '../services/weather';
import {
  addHourlyForecastData,
  addDailyForecastData,
  addWeatherData,
  resetWeather,
} from './weatherReducer';
import { resetAuth, setIsLoggedIn, setToken } from './authReducer';

// Router
import history from '../router/history';

const initialState: ILoggedInUser = {
  firstName: null,
  lastName: null,
  email: null,
  id: null,
  weatherLocationData: null,
};

const userFromStorage = localStorage.getItem('loggedInUser');

const userSlice = createSlice({
  name: 'user',
  initialState: userFromStorage ? JSON.parse(userFromStorage) : initialState,
  reducers: {
    setUser(state, action) {
      return (state = action.payload);
    },
    updateUser(state, action) {
      return (state = action.payload);
    },
    resetUser: () => initialState,
  },
});

export const logout = (navigateTo: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setIsLoggedIn(false));
    dispatch(resetUser());
    dispatch(resetPatients());
    dispatch(resetDiagnoses());
    dispatch(resetWeather());
    dispatch(resetAuth());
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('authorization');
    localStorage.removeItem('patients');
    localStorage.removeItem('diagnoses');
    localStorage.removeItem('weather');
    localStorage.removeItem('hourlyForecast');
    localStorage.removeItem('dailyForecast');
    history.replace(`/${navigateTo}`);
  };
};

export const login = (credentials: ILoginCredentials) => {
  return async (dispatch: Dispatch) => {
    const response = await loginService.login(credentials);

    if (response === undefined) {
      // Prune Tree if response is undefined
      return;
    } else if (response.auth.token) {
      // Set token in auth slice and set user in user slice
      dispatch(setUser(response.user));
      localStorage.setItem('loggedInUser', JSON.stringify(response.user));

      dispatch(setToken(response.auth));
      dispatch(setIsLoggedIn(true));
      localStorage.setItem('authorization', JSON.stringify(response.auth));

      const patients = await patientService.fetchAllPatients(
        response.auth.token
      );
      if (patients === undefined) {
        return new Error('Patients not found in userReducer: Line: 52');
      }
      dispatch(setAllPatients(patients));
      localStorage.setItem('patients', JSON.stringify(patients));

      const diagnoses = await diagnosesService.fetchDiagnosesFromApi(
        response.auth.token
      );
      if (diagnoses === undefined) {
        return new Error('Diagnoses not found in userReducer: Line: 58');
      }
      dispatch(setDiagnoses(diagnoses));
      localStorage.setItem('diagnoses', JSON.stringify(diagnoses));
    }

    const weather = await weatherService.fetchCurrentWeatherDataFromApi(
      response.user.weatherLocationData.lat,
      response.user.weatherLocationData.lon
    );
    if (weather === undefined) {
      return new Error('weather not found in userReducer: Line: 79');
    }
    dispatch(addWeatherData(weather));
    localStorage.setItem('weather', JSON.stringify(weather));

    const hourlyForecast = await weatherService.fetchHourlyForecastWeatherData(
      response.user.weatherLocationData.lat,
      response.user.weatherLocationData.lon
    );
    if (hourlyForecast === undefined) {
      return new Error('forecast not found in userReducer: Line: 89');
    }
    dispatch(addHourlyForecastData(hourlyForecast));
    localStorage.setItem('hourlyForecast', JSON.stringify(hourlyForecast));

    const dailyForecast = await weatherService.fetchDailyForecastWeatherData(
      response.user.weatherLocationData.lat,
      response.user.weatherLocationData.lon
    );
    if (dailyForecast === undefined) {
      return new Error('forecast not found in userReducer: Line: 89');
    }
    dispatch(addDailyForecastData(dailyForecast));
    localStorage.setItem('dailyForecast', JSON.stringify(dailyForecast));
    history.replace('/home');
  };
};

export const updateUserWeatherLocationData = (
  userId: string,
  weatherLocationData: ApiGeocodeResults
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await userService.updateWeatherDataToUserProfile(
        userId,
        weatherLocationData
      );

      dispatch(updateUser(response));
    } catch (error) {
      console.error(error);
    }
  };
};

export const { setUser, updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
