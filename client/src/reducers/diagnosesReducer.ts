// Redux
import { Dispatch } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Types
import { Diagnosis } from '../types/types';

// Services
import diagnosesService from '../services/diagnoses';

export interface InitialState {
  diagnoses: Diagnosis[] | [];
  patientDiagnosesCodes: Array<Diagnosis['code']> | [];
}

const initialState: InitialState = {
  diagnoses: [],
  patientDiagnosesCodes: [],
};

const diagnosesSlice = createSlice({
  name: 'diagnoses',
  initialState,
  reducers: {
    setDiagnoses(state, action) {
      return (state = action.payload);
    },
    setPatientDiagnosesCodes(state, action) {
      const updatedState = {
        ...state,
        patientDiagnosesCodes: [action.payload],
      };
      return (state = updatedState);
    },
    resetDiagnoses: () => initialState,
  },
});

export const getAllDiagnoses = (token?: string) => {
  return async (dispatch: Dispatch) => {
    try {
      localStorage.removeItem('diagnoses');
      const response = await diagnosesService.fetchDiagnosesFromApi(token);
      if (response) {
        localStorage.setItem('diagnoses', JSON.stringify(response));
        dispatch(setDiagnoses(response));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const setPatientDiagnoses = (codes: Array<Diagnosis['code']>) => {
  return (dispatch: Dispatch) => {
    dispatch(setPatientDiagnosesCodes(codes));
  };
};

export const { setDiagnoses, setPatientDiagnosesCodes, resetDiagnoses } =
  diagnosesSlice.actions;
export default diagnosesSlice.reducer;
