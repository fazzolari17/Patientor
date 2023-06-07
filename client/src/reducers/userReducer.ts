// Redux
import { Dispatch } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Types
import { ILoginCredentials, ILoggedInUser } from '../types/types';
import { ApiGeocodeResults } from '../types/weather';

// reducers
import { getAllDiagnoses, resetDiagnoses } from './diagnosesReducer';
import { fetchPatientList, resetPatients } from './patientReducer';
import { resetAuth, setIsLoggedIn, setToken } from './authReducer';
import {
  resetWeather,
  fetchCurrentWeatherData,
  fetchForecastBasedOnTimestamp,
} from './weatherReducer';

// Services
import loginService from '../services/login';
import userService from '../services/user';

// Router
import history from '../router/history';
import axios from 'axios';

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

    // Navigate After login passed as a argument to navigate to different places
    // depending on the reason for logging out Example: Logged out due to expired
    // JSON Web Token vs User initiated logout.
    history.replace(`/${navigateTo}`);
  };
};

export const login = (credentials: ILoginCredentials) => {
  return async (dispatch: Dispatch) => {
    const response = await loginService.login(credentials);
    const token = response.auth.token;
    const lat = response.user.weatherLocationData.lat;
    const lon = response.user.weatherLocationData.lon;

    if (response === undefined) {
      // Prune Tree if response is undefined
      return;
    } else if (token) {
      // Set token in auth slice and set user in user slice
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Set User into state if token is returned
      dispatch(setUser(response.user));
      localStorage.setItem('loggedInUser', JSON.stringify(response.user));

      dispatch(setToken(response.auth));
      localStorage.setItem('authorization', JSON.stringify(response.auth));

      dispatch(setIsLoggedIn(true));

      const patientsDispatch = fetchPatientList(token);
      patientsDispatch(dispatch);

      const diagnosesDispatch = getAllDiagnoses(token);
      diagnosesDispatch(dispatch);

      const currentWeatherDispatch = fetchCurrentWeatherData(lat, lon);
      currentWeatherDispatch(dispatch);

      const forecastWeatherDispatch = fetchForecastBasedOnTimestamp(lat, lon);
      forecastWeatherDispatch(dispatch);

      // Navigate after logging in
      history.replace('/home');
    }
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
