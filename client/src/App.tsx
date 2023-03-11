import './services/interceptors';
import React from 'react';
import axios from 'axios';

// Router
import { Route, Routes } from 'react-router-dom';

// constants
import { API_BASE_URI } from './constants';

// material ui
import { Divider, Container } from '@material-ui/core';

// Redux / Reducers
import { useAppDispatch } from './store';
import {
  addHourlyForecastData,
  addDailyForecastData,
  addWeatherData,
  fetchCurrentWeatherData,
  fetchForecastWeatherData,
} from './reducers/weatherReducer';
import { setUser, login, logout } from './reducers/userReducer';
import { fetchPatientList, setAllPatients } from './reducers/patientReducer';
import { setIsLoggedIn } from './reducers/authReducer';

// Types
import { ILoginCredentials } from './types';

// Components / Views
import Menu from './views/Menu';
import SignUp from './views/SignUp/SignUp';
import HomePage from './views/Home/HomePage';
import PatientPage from './views/PatientPage';
import LoginPage from './views/LoginPage/index';
import PatientListPage from './views/PatientListPage';

// Services
import { setDiagnoses, getAllDiagnoses } from './reducers/diagnosesReducer';

//  Component / Views
import WeatherPage from './views/WeatherPage';

import { useSelector } from 'react-redux';
import { RootState } from './store';

const App = () => {
  const {
    auth: { isLoggedIn },
  } = useSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    void axios.get<void>(`${API_BASE_URI}/health`);
    checkAndLoadDataFromLocalstorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const checkAndLoadDataFromLocalstorage = () => {
    const loggedInUserJSON = localStorage.getItem('loggedInUser');
    const authTokenInLocalStorage = localStorage.getItem('authorization');
    const patientsInLocalStorage = localStorage.getItem('patients');
    const diagnosesInLocalStorage = localStorage.getItem('diagnoses');
    const weatherInLocalStorage = localStorage.getItem('weather');
    const hourlyForecastInLocalStorage = localStorage.getItem('hourlyForecast');
    const dailyForecastInLocalStorage = localStorage.getItem('dailyForecast');

    // Checks for data in localStorage and loads it into State if it is there
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);

      if (user.firstName !== null) {
        if (authTokenInLocalStorage) {
          const auth = JSON.parse(authTokenInLocalStorage);
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${auth.token}`;
        }
        dispatch(fetchPatientList(user.token));
        dispatch(getAllDiagnoses(user.token));
        dispatch(setIsLoggedIn(true));
        dispatch(setUser(user));
        dispatch(
          fetchCurrentWeatherData(
            user.weatherLocationData.lat,
            user.weatherLocationData.lon
          )
        );
        dispatch(
          fetchForecastWeatherData(
            user.weatherLocationData.lat,
            user.weatherLocationData.lon
          )
        );

        if (weatherInLocalStorage) {
          const weather = JSON.parse(weatherInLocalStorage);
          dispatch(addWeatherData(weather));
        }

        if (hourlyForecastInLocalStorage) {
          const hourlyForecast = JSON.parse(hourlyForecastInLocalStorage);
          dispatch(addHourlyForecastData(hourlyForecast));
        }

        if (dailyForecastInLocalStorage) {
          const dailyForecast = JSON.parse(dailyForecastInLocalStorage);
          dispatch(addDailyForecastData(dailyForecast));
        }

        if (patientsInLocalStorage) {
          const patients = JSON.parse(patientsInLocalStorage);
          if (patients.length === 0) return;
          dispatch(setAllPatients(patients));
        } else if (!patientsInLocalStorage) {
          localStorage.removeItem('patients');
        }
        if (diagnosesInLocalStorage) {
          const diagnoses = JSON.parse(diagnosesInLocalStorage);
          if (diagnoses.length === 0) return;
          dispatch(setDiagnoses(diagnoses));
        } else if (!diagnosesInLocalStorage) {
          localStorage.removeItem('diagnoses');
        }
      }
    } else if (!loggedInUserJSON) {
      localStorage.removeItem('user');
    }
  };

  const handleLogin = async (userToLogin: ILoginCredentials): Promise<void> => {
    await dispatch(login(userToLogin));
  };

  function handleLogout() {
    dispatch(logout('home'));
  }

  return (
    <Menu handleLogout={handleLogout} isLoggedIn={isLoggedIn}>
      <div>
        <Container>
          {/* <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
              Patientor
            </Typography>
            <Button component={Link} to="/" variant="contained" color="primary">
              Home
            </Button> */}
          <Divider hidden />
          <Routes>
            <Route
              path="/home"
              element={<HomePage isLoggedIn={isLoggedIn} />}
            />

            <Route path={'/weather'} element={<WeatherPage />} />
            <Route path={'/patients'} element={<PatientListPage />} />
            <Route path={'/patients/:id'} element={<PatientPage />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
              }
            />
            {/* <Route path="/*"  element={<PatientPage />} / */}
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          </Routes>
        </Container>
      </div>
    </Menu>
  );
};

export default App;
