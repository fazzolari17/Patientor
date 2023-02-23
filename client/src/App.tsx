import React from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';

// constants
import { apiBaseUrl } from './constants';

// material ui
import { Button, Divider, Container } from '@material-ui/core';
import { Typography } from '@material-ui/core';

// Redux / Reducers
import { useSelector } from 'react-redux';
import { useAppDispatch } from './store';
import {
  setUser,
  useLogin,
  useRemoveUserFromState,
} from './reducers/userReducer';
import {
  useFetchPatientList,
  setAllPatients,
  useRemovePatientsFromState,
} from './reducers/patientReducer';

// Types
import { RootState } from './store';
import { User, ILoggedInUser } from './types';

// Components / Views
import Menu from './Menu';
import SignUp from './views/SignUp/SignUp';
import HomePage from './views/Home/HomePage';
import PatientPage from './views/PatientPage';
import LoginPage from './views/LoginPage/index';
import PatientListPage from './views/PatientListPage';

// Services
import {
  setDiagnoses,
  useGetAllDiagnoses,
  useRemoveDiagnosesFromState,
} from './reducers/diagnosesReducer';
import WeatherPage from './views/WeatherPage';

const App = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const userEmail = useSelector((state: ILoggedInUser) => state.email);
  const { user } = useSelector((state: RootState) => state);
  const { patients } = useSelector((state: RootState) => state);

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const loggedInUserJSON = localStorage.getItem('loggedInUser');
    const patientsInLocalStorage = localStorage.getItem('patients');
    const diagnosesInLocalStorage = localStorage.getItem('diagnoses');
    // Fix this mess
    // if (loggedInUserJSON === 'undefined') {
    //   localStorage.removeItem('loggedInUser');
    //   return navigate('/login');
    // };

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      if (user.firstName !== null) {
        void dispatch(useFetchPatientList(user.token));
        void dispatch(useGetAllDiagnoses(user.token));
        setIsLoggedIn(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        dispatch(setUser(user));
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

    const fetchDiagnosis = () => {
      try {
        // const getDiagnosesAndSaveToStore = getAllDiagnoses();
        // getDiagnosesAndSaveToStore(dispatch)
        // dispatch(getAllDiagnoses());
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  const handleLogin = async (userToLogin: User) => {
    const loginResponse = await dispatch(useLogin(userToLogin));

    if (loginResponse === 'user does not exist create an account') {
      return navigate('/sign%20up');
    } else if (loginResponse === 'invalid username or password') {
      return navigate('login');
    }
    dispatch(useFetchPatientList());
    navigate('/home');
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    navigate('/home');
    setIsLoggedIn(false);
    dispatch(useRemoveUserFromState());
    dispatch(useRemovePatientsFromState());
    dispatch(useRemoveDiagnosesFromState());
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('patients');
    localStorage.removeItem('diagnoses');
  };

  return (
    <Menu
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      isLoggedIn={isLoggedIn}
    >
      <div className="App">
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
            <Route path="/sign%20up" element={<SignUp />} />
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
