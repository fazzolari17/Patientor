// Redux
import { Dispatch } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Types
import { ILoginCredentials, ILoggedInUser } from '../types';

// reducers
import { setDiagnoses } from './diagnosesReducer';
import { setAllPatients } from './patientReducer';

// Services
import loginService from '../services/login';
import patientService from '../services/patients';
import diagnosesService from '../services/diagnoses';

const initialState: ILoggedInUser = {
  token: null,
  firstName: null,
  lastName: null,
  email: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return (state = action.payload);
    },
    removeUser(state, action) {
      return (state = action.payload);
    },
  },
});

export const login = (credentials: ILoginCredentials) => {
  return async (dispatch: Dispatch) => {
    const response = await loginService.login(credentials);

    if (response.token === 'undefined' || !response.token) {
      if (response.error.response.status >= 400) {
        const message = response.error.response.data.error;
        alert(message);
        return response.error.response.data.error;
      }
    } else if (response.token) {
      dispatch(setUser(response));
      localStorage.setItem('loggedInUser', JSON.stringify(response));

      const patients = await patientService.fetchAllPatients(response.token);
      if (patients === undefined)
        return new Error('Patients not found in userReducer: Line: 52');
      dispatch(setAllPatients(patients));
      localStorage.setItem('patients', JSON.stringify(patients));

      const diagnoses = await diagnosesService.fetchDiagnosesFromApi(
        response.token
      );
      if (diagnoses === undefined)
        return new Error('Diagnoses not found in userReducer: Line: 58');
      dispatch(setDiagnoses(diagnoses));
      localStorage.setItem('diagnoses', JSON.stringify(diagnoses));
    }
  };
};

export const removeUserFromState = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(removeUser(initialState));
    } catch (error) {
      console.error(error);
    }
  };
};

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
